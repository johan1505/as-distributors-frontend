"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent,
  type Ref,
} from "react";
import { useTranslations } from "next-intl";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuote, MAX_QUANTITY_PER_PRODUCT } from "./QuoteProvider";
import {
  getProductSubtypeConfig,
  type ProductBase,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddToQuoteButtonProps {
  product: ProductBase;
  selectedSubtypeValue?: string;
  onSelectedSubtypeValueChange?: (value: string) => void;
  lockedSubtypeValue?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
  inputRef?: Ref<HTMLInputElement>;
  hasError?: boolean;
}

export function AddToQuoteButton({
  product,
  selectedSubtypeValue: selectedSubtypeValueProp,
  onSelectedSubtypeValueChange,
  lockedSubtypeValue,
  variant = "default",
  size = "default",
  className,
  inputRef: externalInputRef,
  hasError = false,
}: AddToQuoteButtonProps) {
  const t = useTranslations("product");
  const tQuote = useTranslations("quote");
  const {
    getQuantity,
    getSelectedSubtypeValue,
    getTotalQuantityForProduct,
    setSelectedSubtypeValue,
    updateQuantity,
  } = useQuote();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isStaged, setIsStaged] = useState(false);
  const subtypeConfig = getProductSubtypeConfig(product);
  const selectedSubtypeValue =
    lockedSubtypeValue ??
    selectedSubtypeValueProp ??
    getSelectedSubtypeValue(product.slug) ??
    subtypeConfig?.defaultOptionValue ??
    undefined;

  const quantity = getQuantity(product, selectedSubtypeValue);
  const totalQuantity = getTotalQuantityForProduct(product.slug);
  const [draftQuantity, setDraftQuantity] = useState(
    quantity > 0 ? String(quantity) : ""
  );

  const showInput = totalQuantity > 0 || isStaged;

  const clampQuantity = (value: number) =>
    Math.min(Math.max(0, value), MAX_QUANTITY_PER_PRODUCT);

  const parseDraft = (value: string) => {
    if (!value) return 0;
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const currentValue =
    draftQuantity === "" && quantity > 0
      ? clampQuantity(quantity)
      : clampQuantity(parseDraft(draftQuantity));

  const isAtMax = currentValue >= MAX_QUANTITY_PER_PRODUCT;

  useEffect(() => {
    if (isFocused) return;
    if (quantity > 0) {
      setDraftQuantity(String(quantity));
      setIsStaged(false);
      return;
    }
    if (!isStaged) {
      setDraftQuantity("");
    }
  }, [quantity, isFocused, isStaged]);

  useEffect(() => {
    if (lockedSubtypeValue || !subtypeConfig || selectedSubtypeValue) {
      return;
    }

    if (onSelectedSubtypeValueChange) {
      onSelectedSubtypeValueChange(subtypeConfig.defaultOptionValue);
    } else {
      setSelectedSubtypeValue(product, subtypeConfig.defaultOptionValue);
    }
  }, [
    lockedSubtypeValue,
    onSelectedSubtypeValueChange,
    product,
    selectedSubtypeValue,
    setSelectedSubtypeValue,
    subtypeConfig,
  ]);

  const sizeStyles = {
    default: {
      container: "h-9 text-sm",
      button: "size-8",
      icon: "size-4",
      input: "text-sm",
    },
    sm: {
      container: "h-8 text-sm",
      button: "size-7",
      icon: "size-3",
      input: "text-sm",
    },
    lg: {
      container: "h-10 text-base",
      button: "size-9",
      icon: "size-4",
      input: "text-base",
    },
  } as const;

  const containerTone = "bg-primary border-primary/60";

  const stepperButtonTone =
    "bg-primary text-white hover:bg-primary/90 active:bg-primary/80";

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (!externalInputRef) return;
    if (typeof externalInputRef === "function") {
      externalInputRef(node);
    } else {
      externalInputRef.current = node;
    }
  };

  const focusInput = () => {
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const startEditing = () => {
    if (subtypeConfig) {
      const defaultSubtypeValue =
        lockedSubtypeValue ??
        selectedSubtypeValue ??
        subtypeConfig.defaultOptionValue;
      if (!lockedSubtypeValue) {
        if (onSelectedSubtypeValueChange) {
          onSelectedSubtypeValueChange(defaultSubtypeValue);
        } else {
          setSelectedSubtypeValue(product, defaultSubtypeValue);
        }
      }
      updateQuantity(
        product,
        Math.max(getQuantity(product, defaultSubtypeValue), 1),
        defaultSubtypeValue
      );
    }
    setIsStaged(true);
    setDraftQuantity("1");
    focusInput();
  };

  const commitQuantity = (value: number) => {
    const next = clampQuantity(value);
    updateQuantity(product, next, selectedSubtypeValue);
    setIsStaged(next > 0);
  };

  const handleBlur = () => {
    setIsFocused(false);
    commitQuantity(parseDraft(draftQuantity));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    if (!/^\d*$/.test(nextValue)) return;
    setDraftQuantity(nextValue);
  };

  const handleStep = (delta: number) => {
    const next = clampQuantity(currentValue + delta);
    setDraftQuantity(String(next));
    updateQuantity(product, next, selectedSubtypeValue);
    if (next <= 0 && totalQuantity - currentValue <= 0) {
      setIsStaged(false);
    }
  };

  const preventFocusShift = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  if (!showInput) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={startEditing}
        className={cn(className, "cursor-pointer")}
      >
        <ShoppingCart data-icon="inline-start" className="size-4" />
        {t("addToQuote")}
      </Button>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {subtypeConfig && !lockedSubtypeValue ? (
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            {t(`criteria.${subtypeConfig.criterionKey}`)}
          </label>
          <Select
            value={selectedSubtypeValue}
            onValueChange={(value) => {
              if (!value) {
                return;
              }
              if (onSelectedSubtypeValueChange) {
                onSelectedSubtypeValueChange(value);
              } else {
                setSelectedSubtypeValue(product, value);
              }
              setDraftQuantity(
                getQuantity(product, value) > 0
                  ? String(getQuantity(product, value))
                  : ""
              );
            }}
          >
            <SelectTrigger className="w-full rounded-xl bg-background" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subtypeConfig.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}

      <div
        className={cn(
          "inline-flex items-center gap-1 rounded-4xl border px-1.5 transition-colors focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
          sizeStyles[size].container,
          containerTone,
          hasError && "border-destructive/60 focus-within:border-destructive"
        )}
      >
        <button
          type="button"
          onPointerDown={preventFocusShift}
          onClick={() => handleStep(-1)}
          disabled={currentValue <= 0}
          aria-label={tQuote("decreaseQuantity")}
          className={cn(
            "inline-flex items-center justify-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-50",
            sizeStyles[size].button,
            stepperButtonTone
          )}
        >
          <Minus className={sizeStyles[size].icon} />
        </button>
        <Input
          ref={setInputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={draftQuantity}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.currentTarget.blur();
            }
          }}
          aria-label={tQuote("quantity")}
          aria-invalid={hasError || undefined}
          placeholder={tQuote("quantity")}
          className={cn(
            "h-full flex-1 rounded-3xl border border-input/80 bg-background px-2 py-0 text-center shadow-inner focus-visible:ring-0 focus-visible:ring-offset-0",
            hasError && "border-destructive/60",
            sizeStyles[size].input
          )}
        />
        <button
          type="button"
          onPointerDown={preventFocusShift}
          onClick={() => handleStep(1)}
          disabled={isAtMax}
          aria-label={tQuote("increaseQuantity")}
          className={cn(
            "inline-flex items-center justify-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-50",
            sizeStyles[size].button,
            stepperButtonTone
          )}
        >
          <Plus className={sizeStyles[size].icon} />
        </button>
      </div>
    </div>
  );
}
