import type { StaticImageData } from 'next/image';
import type { ProductSlug } from '@/lib/products';

import imgOxPalmCornedBeef7oz from '@/public/images/ox-palm-corned-beef-7oz.webp';
import imgOxPalmCornedBeef115oz from '@/public/images/ox-palm-corned-beef-11-5oz.webp';
import imgOxPalmCornedBeefTapered from '@/public/images/ox-palm-corned-beef-tapered.webp';
import imgOxPalmCornedBeef15oz from '@/public/images/ox-palm-corned-beef-15oz.webp';
import imgOxPalmCornedBeef3lb from '@/public/images/ox-palm-corned-beef-3lb.webp';
import imgOxPalmCornedBeef6lb from '@/public/images/ox-palm-corned-beef-6lb.webp';
import imgPacificCornedBeef7oz from '@/public/images/pacific-corned-beef-7oz.webp';
import imgPacificCornedBeef115oz from '@/public/images/pacific-corned-beef-11-5oz.webp';
import imgPacificCornedBeef15oz from '@/public/images/pacific-corned-beef-15oz.webp';
import imgPacificCornedBeef3lb from '@/public/images/pacific-corned-beef-3lb.webp';
import imgCrownCornedMutton from '@/public/images/crown-corned-mutton.webp';
import imgColonialCornedMuttonHalal from '@/public/images/colonial-corned-mutton-halal.webp';
import imgColonialCornedMuttonRegular from '@/public/images/colonial-corned-mutton-regular.webp';
import imgGlobeCornedMuttonHalal from '@/public/images/globe-corned-mutton-halal.webp';
import imgAngelMackerelNaturalOil from '@/public/images/angel-mackerel-natural-oil.webp';
import imgAngelMackerelTomatoSauce from '@/public/images/angel-mackerel-tomato-sauce.webp';
import imgPacificOceanMackerelNaturalOil from '@/public/images/pacific-ocean-mackerel-natural-oil.webp';
import imgPacificOceanMackerelTomatoSauce from '@/public/images/pacific-ocean-mackerel-tomato-sauce.webp';
import img777MackerelNaturalOil from '@/public/images/777-mackerel-natural-oil.webp';
import img777MackerelTomatoSauce from '@/public/images/777-mackerel-tomato-sauce.webp';
import imgBrunswickSardinesSoybeanOil from '@/public/images/brunswick-sardines-soybean-oil.webp';
import imgSkipperTunaVegetableOil from '@/public/images/skipper-tuna-vegetable-oil.webp';
import imgFishKawaKawa from '@/public/images/fish-kawa-kawa.png';
import imgFishKawaKawaSteakSlices from '@/public/images/fish-kawa-kawa-steak-slices.webp';
import imgUlaviParrotFish from '@/public/images/ulavi-parrot-fish.webp';
import imgUnicornTa from '@/public/images/unicorn-ta.webp';
import imgKawango from '@/public/images/kawango.png';
import imgPacificTasteCoconutMilk13oz from '@/public/images/pacific-taste-coconut-milk-13oz.webp';
import imgPacificTasteCoconutMilk98oz from '@/public/images/pacific-taste-coconut-milk-98oz.webp';
import imgPacificCrownFijiCoconutCream from '@/public/images/pacific-crown-fiji-coconut-cream.webp';
import imgPacificCrownBreadfruit from '@/public/images/pacific-crown-breadfruit.png';
import imgPacificCrownTahitianChestnut from '@/public/images/pacific-crown-tahitian-chestnut.webp';
import imgWattiesSpaghettiTomatoSauce from '@/public/images/watties-spaghetti-tomato-sauce.webp';
import imgWattiesBakedBeansTomatoSauce from '@/public/images/watties-baked-beans-tomato-sauce.webp';
import imgPalusamiTaroLeaves from '@/public/images/palusami-taro-leaves.webp';
import imgPacificCrownDurukaStalkBrine from '@/public/images/pacific-crown-duruka-stalk-brine.webp';
import imgMilkArrowroot from '@/public/images/milk-arrowroot.webp';
import imgMonteCarlo from '@/public/images/monte-carlo.webp';
import imgTimTamExtraChocolate from '@/public/images/tim-tam-extra-chocolate.png';
import imgTimTamChewyCaramel from '@/public/images/tim-tam-chewy-caramel.webp';
import imgTimTamDarkChocolate from '@/public/images/tim-tam-dark-chocolate.webp';
import imgTimTamMint from '@/public/images/tim-tam-mint.webp';
import imgTimTamOriginal from '@/public/images/tim-tam-original.webp';
import imgDeltaCream from '@/public/images/delta-cream.webp';
import imgScotchFinger from '@/public/images/scotch-finger.webp';
import imgShortbreadCream from '@/public/images/shortbread-cream.webp';
import imgShortbreadPlain from '@/public/images/shortbread-plain.webp';
import imgPunjasMilkArrowroot from '@/public/images/punjas-milk-arrowroot.webp';
import imgFmfMilkArrowroot from '@/public/images/fmf-milk-arrowroot.webp';
import imgFmfCoconutCookies from '@/public/images/fmf-coconut-cookies.webp';
import imgBigSisterLightFruitCake from '@/public/images/big-sister-light-fruit-cake.webp';
import imgBigSisterDarkFruitCake from '@/public/images/big-sister-dark-fruit-cake.webp';
import imgFmfFlour from '@/public/images/fmf-flour.webp';
import imgSaoShortbreadCream from '@/public/images/sao-shortbread-cream.webp';
import imgFmfScotchFinger from '@/public/images/fmf-scotch-finger.webp';
import imgFmfBreakfastCrackers13oz from '@/public/images/fmf-breakfast-crackers-13oz.webp';
import imgFmfBreakfastCrackersFine from '@/public/images/fmf-breakfast-crackers-fine.png';
import imgFmfBreakfastCrackers4lb from '@/public/images/fmf-breakfast-crackers-4lb.webp';
import imgFmfBreakfastCrackers11lb from '@/public/images/fmf-breakfast-crackers-11lb.webp';
import imgCornPuffMix from '@/public/images/corn-puff-mix.webp';
import imgLakdhiMethai from '@/public/images/lakdhi-methai.webp';
import imgMurkoo from '@/public/images/murkoo.webp';
import imgRiceMurkoo from '@/public/images/rice-murkoo.webp';
import imgDesiMix from '@/public/images/desi-mix.webp';
import imgMadrasMix from '@/public/images/madras-mix.webp';
import imgPunjabiMix from '@/public/images/punjabi-mix.webp';
import imgSaoPlain from '@/public/images/sao-plain.webp';
import imgSaoFine from '@/public/images/sao-fine.webp';
import imgSaoMix from '@/public/images/sao-mix.webp';
import imgPeanutPeasMix from '@/public/images/peanut-peas-mix.webp';
import imgFriedPeanuts from '@/public/images/fried-peanuts.webp';
import imgFriedPeas from '@/public/images/fried-peas.webp';
import imgFriedPeasHot from '@/public/images/fried-peas-hot.webp';
import imgFijiMix from '@/public/images/fiji-mix.webp';
import imgFixMixSpicy from '@/public/images/fix-mix-spicy.webp';
import imgBongoCheeseSnack156gr from '@/public/images/bongo-cheese-snack-156gr.png';
import imgBongoCheeseSnack64gr from '@/public/images/bongo-cheese-snack-64gr.png';
import imgBongoCheeseSnack28gr from '@/public/images/bongo-cheese-snack-28gr.png';
import imgBongoChickenSnack156gr from '@/public/images/bongo-chicken-snack-156gr.png';
import imgBongoChickenSnack64gr from '@/public/images/bongo-chicken-snack-64gr.png';
import imgBongoChickenSnack28gr from '@/public/images/bongo-chicken-snack-28gr.png';
import imgTwistesCheese20gr from '@/public/images/twistes-cheese-20gr.png';
import imgTwistesCheese100gr from '@/public/images/twistes-cheese-100gr.png';
import imgTwistesCheese250gr from '@/public/images/twistes-cheese-250gr.png';
import imgTwistesCheese500gr from '@/public/images/twistes-cheese-500gr.png';
import imgTwistesSourCream100gr from '@/public/images/twistes-sour-cream-100gr.png';
import imgTwistesSourCream250gr from '@/public/images/twistes-sour-cream-250gr.png';
import imgTwistesChicken20gr from '@/public/images/twistes-chicken-20gr.png';
import imgTwistesChicken100gr from '@/public/images/twistes-chicken-100gr.png';
import imgTwistesChicken250gr from '@/public/images/twistes-chicken-250gr.png';
import imgTwistesChicken500gr from '@/public/images/twistes-chicken-500gr.png';
import imgUfoBurger20gr from '@/public/images/ufo-burger-20gr.png';
import imgUfoBurger100gr from '@/public/images/ufo-burger-100gr.png';
import imgUfoBurger200gr from '@/public/images/ufo-burger-200gr.png';
import imgJasonsPeanutRuffs28gr from '@/public/images/jasons-peanut-ruffs-28gr.png';
import imgJasonsPeanutRuffs64gr from '@/public/images/jasons-peanut-ruffs-64gr.png';
import imgJasonsPeanutRuffs156gr from '@/public/images/jasons-peanut-ruffs-156gr.png';
import imgChowTomatoFlavour from '@/public/images/chow-tomato-flavour.png';
import imgChowChickenFlavour from '@/public/images/chow-chicken-flavour.png';
import imgChowCurryFlavour from '@/public/images/chow-curry-flavour.png';
import imgCadburyCrunchieBars from '@/public/images/cadbury-crunchie-bars.webp';
import imgCadburyDreamBars from '@/public/images/cadbury-dream-bars.webp';
import imgCadburyFruitNut from '@/public/images/cadbury-fruit-nut.webp';
import imgCadburyDairyMilkBar from '@/public/images/cadbury-dairy-milk-bar.webp';
import imgHomemaidAmraPickles from '@/public/images/homemaid-amra-pickles.webp';
import imgHomemaidKamrakStarPickleApple from '@/public/images/homemaid-kamrak-star-pickle-apple.webp';
import imgHomemaidKutchlaHotMangoChutney from '@/public/images/homemaid-kutchla-hot-mango-chutney.webp';
import imgHomemaidMango from '@/public/images/homemaid-mango.webp';
import imgHomemaidTamarindChutney from '@/public/images/homemaid-tamarind-chutney.webp';
import imgHomemaidBongoChili from '@/public/images/homemaid-bongo-chili.webp';
import imgHomemaidSweetMangoPickle from '@/public/images/homemaid-sweet-mango-pickle.webp';
import imgPacificChoiceCurryPowderMild from '@/public/images/pacific-choice-curry-powder-mild.webp';
import imgPacificChoiceCurryPowderHot from '@/public/images/pacific-choice-curry-powder-hot.webp';
import imgPunjasCurryPowder from '@/public/images/punjas-curry-powder.webp';
import imgPunjasHaldiPowderTurmeric from '@/public/images/punjas-haldi-powder-turmeric.webp';
import imgPunjasHotMasala1764oz from '@/public/images/punjas-hot-masala-17-64oz.webp';
import imgPunjasHotMasala220lbs from '@/public/images/punjas-hot-masala-2-20lbs.webp';
import imgPunjasMeatMasala from '@/public/images/punjas-meat-masala.webp';
import imgPunjasCoconutOil from '@/public/images/punjas-coconut-oil.webp';
import imgPunjasMustardOil750ml from '@/public/images/punjas-mustard-oil-750ml.webp';
import imgPunjasMustardOil2lt from '@/public/images/punjas-mustard-oil-2lt.webp';
import imgPunjasMustardOil4lt from '@/public/images/punjas-mustard-oil-4lt.webp';
import imgPunjasGheeButter750ml from '@/public/images/punjas-ghee-butter-750ml.webp';
import imgPunjasGheeButter2lt from '@/public/images/punjas-ghee-butter-2lt.webp';
import imgPunjasVanaspati from '@/public/images/punjas-vanaspati.webp';
import imgPunjasGheeButter4lt from '@/public/images/punjas-ghee-butter-4lt.webp';
import imgNaturalCoconutOilTiara from '@/public/images/natural-coconut-oil-tiara.webp';
import imgNaturalCoconutOilFrangipani from '@/public/images/natural-coconut-oil-frangipani.webp';
import imgNaturalCoconutOilRose from '@/public/images/natural-coconut-oil-rose.webp';
import imgNaturalCoconutOilInfusion from '@/public/images/natural-coconut-oil-infusion.webp';
import imgNaturalCoconutOilSandalwood from '@/public/images/natural-coconut-oil-sandalwood.webp';
import imgWeetbixBreakfastCereal13oz from '@/public/images/weetbix-breakfast-cereal-13oz.webp';
import imgWeetbixBreakfastCereal20oz from '@/public/images/weetbix-breakfast-cereal-20oz.webp';
import imgWeetbixBreakfastCereal2lb from '@/public/images/weetbix-breakfast-cereal-2lb.webp';
import imgFufuMixPlantainFlour from '@/public/images/fufu-mix-plantain-flour.webp';
import imgFufuMixCocoyamFlour from '@/public/images/fufu-mix-cocoyam-flour.webp';
import imgEdmondsCustardPowder from '@/public/images/edmonds-custard-powder.png';
import imgRewaFullCreamMilkPowder from '@/public/images/rewa-full-cream-milk-powder.webp';
import imgMiloPowderSingapore14oz from '@/public/images/milo-powder-singapore-14oz.webp';
import imgMiloPowderSingapore3lb from '@/public/images/milo-powder-singapore-3lb.webp';
import imgKavaLawenaPowder from '@/public/images/kava-lawena-powder.png';
import imgKavaWakePowder from '@/public/images/kava-waka-powder.png';
import imgNestleCocoa from '@/public/images/nestle-cocoa.webp';
import imgPunjasCeylonBlackTea200gr from '@/public/images/punjas-ceylon-black-tea-200gr.webp';
import imgPunjasTeaMasala from '@/public/images/punjas-tea-masala.webp';
import imgLambShoulderWhole from '@/public/images/lamb-shoulder-whole.webp';
import imgLambShoulderChops from '@/public/images/lamb-shoulder-chops.png';
import imgLambShoulderChopsPrepack from '@/public/images/lamb-shoulder-chops-prepack.png';
import imgLambNeckWhole from '@/public/images/lamb-neck-whole.webp';
import imgLambNeckSliced from '@/public/images/lamb-neck-sliced.webp';
import imgLambLegWhole from '@/public/images/lamb-leg-whole.webp';
import imgLambLegSlicedPrepack from '@/public/images/lamb-leg-sliced-prepack.webp';
import imgLambFlapWhole from '@/public/images/lamb-flap-whole.png';
import imgLambShankWhole from '@/public/images/lamb-shank-whole.webp';
import imgLambShankSlicedPrepack from '@/public/images/lamb-shank-sliced-prepack.png';
import imgAustralianGoatWhole from '@/public/images/australian-goat-whole.png';
import imgAustralianGoatDicedPrepack from '@/public/images/australian-goat-diced-prepack.png';
import imgChickenSausage from '@/public/images/chicken-sausage.webp';
import imgChickenSausageHot from '@/public/images/chicken-sausage-hot.webp';
import imgLambSausage2lb from '@/public/images/lamb-sausage-2lb.webp';
import imgLambSausageHot from '@/public/images/lamb-sausage-hot.webp';
import imgSamoanBeefBangers from '@/public/images/samoan-beef-bangers.webp';
import imgSamoanPorkBangers from '@/public/images/samoan-pork-bangers.webp';
import imgMuscovyDuckHalal from '@/public/images/muscovy-duck-halal.png';
import imgPoviMasima from '@/public/images/povi-masima.png';
import imgTurkeyTails from '@/public/images/turkey-tails.png';
import imgFreshTaro from '@/public/images/fresh-taro.png';
import imgYellowCassava2lb from '@/public/images/yellow-cassava-2lb.webp';
import imgWhiteCassava5lb from '@/public/images/white-cassava-5lb.webp';
import imgWhiteCassava2lb from '@/public/images/white-cassava-2lb.webp';
import imgPinkTaro from '@/public/images/pink-taro.webp';
import imgPurpleTaro2lb from '@/public/images/purple-taro-2lb.webp';
import imgPurpleTaro5lb from '@/public/images/purple-taro-5lb.webp';
import imgWhiteTaro from '@/public/images/white-taro.webp';
import imgYellowTaro2lb from '@/public/images/yellow-taro-2lb.webp';
import imgYellowTaro5lb from '@/public/images/yellow-taro-5lb.webp';
import imgBele from '@/public/images/bele.webp';
import imgDuruka from '@/public/images/duruka.webp';
import imgJackfruit from '@/public/images/jackfruit.webp';
import imgTaroLeaves from '@/public/images/taro-leaves.webp';
import imgBreadfruit5lb from '@/public/images/breadfruit-5lb.webp';
import imgTahitianChestnutIvi from '@/public/images/tahitian-chestnut-ivi.webp';
import imgParanthasPlainValuePack from '@/public/images/paranthas-plain-value-pack.webp';
import imgAnchorButterNewZealand from '@/public/images/anchor-butter-new-zealand.webp';
import imgKraftCheddarCheese from '@/public/images/kraft-cheddar-cheese.png';
import imgTuckersBlitz from '@/public/images/tuckers-blitz.webp';
import imgTuckerBlitzBars from '@/public/images/tucker-blitz-bars.webp';
import imgTuckersPassionFruit from '@/public/images/tuckers-passion-fruit.webp';
import imgTuckersTripleRipple from '@/public/images/tuckers-triple-ripple.webp';
import imgKoolPop from '@/public/images/kool-pop.png';
import imgBulaPop from '@/public/images/bula-pop.png';
import imgPacificSplit from '@/public/images/pacific-split.png';
import imgSunquickTropicalJuiceConcentrate from '@/public/images/sunquick-tropical-juice-concentrate.webp';
import imgSunquickOrangeJuiceConcentrate from '@/public/images/sunquick-orange-juice-concentrate.webp';
import imgSunquickMangoJuiceConcentrate from '@/public/images/sunquick-mango-juice-concentrate.webp';
import imgBulaNoniFijiIslands from '@/public/images/bula-noni-fiji-islands.webp';
import imgNestleSmarties50g from '@/public/images/nestle-smarties-50g.png';
import imgNestleMilkybarClassic50g from '@/public/images/nestle-milkybar-classic-50g.png';
import imgNestleKitkatChunkyMilo44g from '@/public/images/nestle-kitkat-chunky-milo-44g.png';
import imgJasonsBlackHacks150g from '@/public/images/jasons-black-hacks-150g.png';
import imgJasonsClearMints150g from '@/public/images/jasons-clear-mints-150g.png';
import imgPopsKola25l from '@/public/images/pops-kola-2-5l.png';
import imgPopsOrange25l from '@/public/images/pops-orange-2-5l.png';
import imgPopsLime25l from '@/public/images/pops-lime-2-5l.png';
import imgPopsRaspberry25l from '@/public/images/pops-raspberry-2-5l.png';
import imgPopsPineapple25l from '@/public/images/pops-pineapple-2-5l.png';
import imgPopsCordialKola1l from '@/public/images/pops-cordial-kola-1l.webp';
import imgPopsCordialRaspberry1l from '@/public/images/pops-cordial-raspberry-1l.webp';
import imgPopsCordialOrange1l from '@/public/images/pops-cordial-orange-1l.png';
import imgPopsCordialPineapple1l from '@/public/images/pops-cordial-pineapple-1l.png';
import imgPopsCordialLime1l from '@/public/images/pops-cordial-lime-1l.webp';
import imgPopsRaspberryCan355ml from '@/public/images/pops-raspberry-can-355ml.png';
import imgPopsKolaCan355ml from '@/public/images/pops-kola-can-355ml.png';
import imgPopsOrangeCan355ml from '@/public/images/pops-orange-can-355ml.png';
import imgPopsPineappleCan355ml from '@/public/images/pops-pineapple-can-355ml.png';
import imgPopsLimeCan355ml from '@/public/images/pops-lime-can-355ml.png';
import imgLapanaTongolChunkTuna from '@/public/images/lapana-tongol-chunk-tuna.png';
import imgOldCapitalSpecialTuna from '@/public/images/old-capital-special-tuna.png';
import imgSunBellTuna from '@/public/images/sun-bell-tuna.png';
import imgOvalauBlueTuna from '@/public/images/ovalau-blue-tuna.png';

export const PRODUCT_IMAGE_BY_SLUG: Partial<Record<ProductSlug, StaticImageData>> = {
	'ox-palm-corned-beef-7oz': imgOxPalmCornedBeef7oz,
	'ox-palm-corned-beef-11-5oz': imgOxPalmCornedBeef115oz,
	'ox-palm-corned-beef-tapered': imgOxPalmCornedBeefTapered,
	'ox-palm-corned-beef-15oz': imgOxPalmCornedBeef15oz,
	'ox-palm-corned-beef-3lb': imgOxPalmCornedBeef3lb,
	'ox-palm-corned-beef-6lb': imgOxPalmCornedBeef6lb,
	'pacific-corned-beef-7oz': imgPacificCornedBeef7oz,
	'pacific-corned-beef-11-5oz': imgPacificCornedBeef115oz,
	'pacific-corned-beef-15oz': imgPacificCornedBeef15oz,
	'pacific-corned-beef-3lb': imgPacificCornedBeef3lb,
	'crown-corned-mutton': imgCrownCornedMutton,
	'colonial-corned-mutton-halal': imgColonialCornedMuttonHalal,
	'colonial-corned-mutton-regular': imgColonialCornedMuttonRegular,
	'globe-corned-mutton-halal': imgGlobeCornedMuttonHalal,
	'angel-mackerel-natural-oil': imgAngelMackerelNaturalOil,
	'angel-mackerel-tomato-sauce': imgAngelMackerelTomatoSauce,
	'pacific-ocean-mackerel-natural-oil': imgPacificOceanMackerelNaturalOil,
	'pacific-ocean-mackerel-tomato-sauce': imgPacificOceanMackerelTomatoSauce,
	'777-mackerel-natural-oil': img777MackerelNaturalOil,
	'777-mackerel-tomato-sauce': img777MackerelTomatoSauce,
	'brunswick-sardines-soybean-oil': imgBrunswickSardinesSoybeanOil,
	'skipper-tuna-vegetable-oil': imgSkipperTunaVegetableOil,
	'fish-kawa-kawa': imgFishKawaKawa,
	'fish-kawa-kawa-steak-slices': imgFishKawaKawaSteakSlices,
	'ulavi-parrot-fish': imgUlaviParrotFish,
	'unicorn-ta': imgUnicornTa,
	kawango: imgKawango,
	'pacific-taste-coconut-milk-13oz': imgPacificTasteCoconutMilk13oz,
	'pacific-taste-coconut-milk-98oz': imgPacificTasteCoconutMilk98oz,
	'pacific-crown-fiji-coconut-cream': imgPacificCrownFijiCoconutCream,
	'pacific-crown-breadfruit': imgPacificCrownBreadfruit,
	'pacific-crown-tahitian-chestnut': imgPacificCrownTahitianChestnut,
	'watties-spaghetti-tomato-sauce': imgWattiesSpaghettiTomatoSauce,
	'watties-baked-beans-tomato-sauce': imgWattiesBakedBeansTomatoSauce,
	'palusami-taro-leaves': imgPalusamiTaroLeaves,
	'pacific-crown-duruka-stalk-brine': imgPacificCrownDurukaStalkBrine,
	'milk-arrowroot': imgMilkArrowroot,
	'monte-carlo': imgMonteCarlo,
	'tim-tam-extra-chocolate': imgTimTamExtraChocolate,
	'tim-tam-chewy-caramel': imgTimTamChewyCaramel,
	'tim-tam-dark-chocolate': imgTimTamDarkChocolate,
	'tim-tam-mint': imgTimTamMint,
	'tim-tam-original': imgTimTamOriginal,
	'delta-cream': imgDeltaCream,
	'scotch-finger': imgScotchFinger,
	'shortbread-cream': imgShortbreadCream,
	'shortbread-plain': imgShortbreadPlain,
	'punjas-milk-arrowroot': imgPunjasMilkArrowroot,
	'fmf-milk-arrowroot': imgFmfMilkArrowroot,
	'fmf-coconut-cookies': imgFmfCoconutCookies,
	'big-sister-light-fruit-cake': imgBigSisterLightFruitCake,
	'big-sister-dark-fruit-cake': imgBigSisterDarkFruitCake,
	'fmf-flour': imgFmfFlour,
	'sao-shortbread-cream': imgSaoShortbreadCream,
	'fmf-scotch-finger': imgFmfScotchFinger,
	'fmf-breakfast-crackers-13oz': imgFmfBreakfastCrackers13oz,
	'fmf-breakfast-crackers-fine': imgFmfBreakfastCrackersFine,
	'fmf-breakfast-crackers-4lb': imgFmfBreakfastCrackers4lb,
	'fmf-breakfast-crackers-11lb': imgFmfBreakfastCrackers11lb,
	'corn-puff-mix': imgCornPuffMix,
	'lakdhi-methai': imgLakdhiMethai,
	murkoo: imgMurkoo,
	'rice-murkoo': imgRiceMurkoo,
	'desi-mix': imgDesiMix,
	'madras-mix': imgMadrasMix,
	'punjabi-mix': imgPunjabiMix,
	'sao-plain': imgSaoPlain,
	'sao-fine': imgSaoFine,
	'sao-mix': imgSaoMix,
	'peanut-peas-mix': imgPeanutPeasMix,
	'fried-peanuts': imgFriedPeanuts,
	'fried-peas': imgFriedPeas,
	'fried-peas-hot': imgFriedPeasHot,
	'fiji-mix': imgFijiMix,
	'fix-mix-spicy': imgFixMixSpicy,
	'bongo-cheese-snack-156gr': imgBongoCheeseSnack156gr,
	'bongo-cheese-snack-64gr': imgBongoCheeseSnack64gr,
	'bongo-cheese-snack-28gr': imgBongoCheeseSnack28gr,
	'bongo-chicken-snack-156gr': imgBongoChickenSnack156gr,
	'bongo-chicken-snack-64gr': imgBongoChickenSnack64gr,
	'bongo-chicken-snack-28gr': imgBongoChickenSnack28gr,
	'twistes-cheese-20gr': imgTwistesCheese20gr,
	'twistes-cheese-100gr': imgTwistesCheese100gr,
	'twistes-cheese-250gr': imgTwistesCheese250gr,
	'twistes-cheese-500gr': imgTwistesCheese500gr,
	'twistes-sour-cream-100gr': imgTwistesSourCream100gr,
	'twistes-sour-cream-250gr': imgTwistesSourCream250gr,
	'twistes-chicken-20gr': imgTwistesChicken20gr,
	'twistes-chicken-100gr': imgTwistesChicken100gr,
	'twistes-chicken-250gr': imgTwistesChicken250gr,
	'twistes-chicken-500gr': imgTwistesChicken500gr,
	'ufo-burger-20gr': imgUfoBurger20gr,
	'ufo-burger-100gr': imgUfoBurger100gr,
	'ufo-burger-200gr': imgUfoBurger200gr,
	'jasons-peanut-ruffs-28gr': imgJasonsPeanutRuffs28gr,
	'jasons-peanut-ruffs-64gr': imgJasonsPeanutRuffs64gr,
	'jasons-peanut-ruffs-156gr': imgJasonsPeanutRuffs156gr,
	'fmf-chow-tomato-flavour': imgChowTomatoFlavour,
	'fmf-chow-chicken-flavour': imgChowChickenFlavour,
	'fmf-chow-curry-flavour': imgChowCurryFlavour,
	'cadbury-crunchie-bars': imgCadburyCrunchieBars,
	'cadbury-dream-bars': imgCadburyDreamBars,
	'cadbury-fruit-nut': imgCadburyFruitNut,
	'cadbury-dairy-milk-bar': imgCadburyDairyMilkBar,
	'homemaid-amra-pickles': imgHomemaidAmraPickles,
	'homemaid-kamrak-star-pickle-apple': imgHomemaidKamrakStarPickleApple,
	'homemaid-kutchla-hot-mango-chutney': imgHomemaidKutchlaHotMangoChutney,
	'homemaid-mango': imgHomemaidMango,
	'homemaid-tamarind-chutney': imgHomemaidTamarindChutney,
	'homemaid-bongo-chili': imgHomemaidBongoChili,
	'homemaid-sweet-mango-pickle': imgHomemaidSweetMangoPickle,
	'pacific-choice-curry-powder-mild': imgPacificChoiceCurryPowderMild,
	'pacific-choice-curry-powder-hot': imgPacificChoiceCurryPowderHot,
	'punjas-curry-powder': imgPunjasCurryPowder,
	'punjas-haldi-powder-turmeric': imgPunjasHaldiPowderTurmeric,
	'punjas-hot-masala-17-64oz': imgPunjasHotMasala1764oz,
	'punjas-hot-masala-2-20lbs': imgPunjasHotMasala220lbs,
	'punjas-meat-masala': imgPunjasMeatMasala,
	'punjas-coconut-oil': imgPunjasCoconutOil,
	'punjas-mustard-oil-750ml': imgPunjasMustardOil750ml,
	'punjas-mustard-oil-2lt': imgPunjasMustardOil2lt,
	'punjas-mustard-oil-4lt': imgPunjasMustardOil4lt,
	'punjas-ghee-butter-750ml': imgPunjasGheeButter750ml,
	'punjas-ghee-butter-2lt': imgPunjasGheeButter2lt,
	'punjas-vanaspati': imgPunjasVanaspati,
	'punjas-ghee-butter-4lt': imgPunjasGheeButter4lt,
	'natural-coconut-oil-tiara': imgNaturalCoconutOilTiara,
	'natural-coconut-oil-frangipani': imgNaturalCoconutOilFrangipani,
	'natural-coconut-oil-rose': imgNaturalCoconutOilRose,
	'natural-coconut-oil-infusion': imgNaturalCoconutOilInfusion,
	'natural-coconut-oil-sandalwood': imgNaturalCoconutOilSandalwood,
	'weetbix-breakfast-cereal-13oz': imgWeetbixBreakfastCereal13oz,
	'weetbix-breakfast-cereal-20oz': imgWeetbixBreakfastCereal20oz,
	'weetbix-breakfast-cereal-2lb': imgWeetbixBreakfastCereal2lb,
	'fufu-mix-plantain-flour': imgFufuMixPlantainFlour,
	'fufu-mix-cocoyam-flour': imgFufuMixCocoyamFlour,
	'edmonds-custard-powder': imgEdmondsCustardPowder,
	'rewa-full-cream-milk-powder': imgRewaFullCreamMilkPowder,
	'milo-powder-singapore-14oz': imgMiloPowderSingapore14oz,
	'milo-powder-singapore-3lb': imgMiloPowderSingapore3lb,
	'kava-lawena-powder': imgKavaLawenaPowder,
	'kava-waka-powder': imgKavaWakePowder,
	'nestle-cocoa': imgNestleCocoa,
	'punjas-ceylon-black-tea-200gr': imgPunjasCeylonBlackTea200gr,
	'punjas-tea-masala': imgPunjasTeaMasala,
	'lamb-shoulder-whole': imgLambShoulderWhole,
	'lamb-shoulder-chops': imgLambShoulderChops,
	'lamb-shoulder-chops-prepack': imgLambShoulderChopsPrepack,
	'lamb-neck-whole': imgLambNeckWhole,
	'lamb-neck-sliced': imgLambNeckSliced,
	'lamb-leg-whole': imgLambLegWhole,
	'lamb-leg-sliced-prepack': imgLambLegSlicedPrepack,
	'lamb-flap-whole': imgLambFlapWhole,
	'lamb-shank-whole': imgLambShankWhole,
	'lamb-shank-sliced-prepack': imgLambShankSlicedPrepack,
	'australian-goat-whole': imgAustralianGoatWhole,
	'australian-goat-diced-prepack': imgAustralianGoatDicedPrepack,
	'chicken-sausage': imgChickenSausage,
	'chicken-sausage-hot': imgChickenSausageHot,
	'lamb-sausage-2lb': imgLambSausage2lb,
	'lamb-sausage-hot': imgLambSausageHot,
	'samoan-beef-bangers': imgSamoanBeefBangers,
	'samoan-pork-bangers': imgSamoanPorkBangers,
	'muscovy-duck-halal': imgMuscovyDuckHalal,
	'povi-masima': imgPoviMasima,
	'turkey-tails': imgTurkeyTails,
	'fresh-taro': imgFreshTaro,
	'yellow-cassava-2lb': imgYellowCassava2lb,
	'white-cassava-5lb': imgWhiteCassava5lb,
	'white-cassava-2lb': imgWhiteCassava2lb,
	'pink-taro': imgPinkTaro,
	'purple-taro-2lb': imgPurpleTaro2lb,
	'purple-taro-5lb': imgPurpleTaro5lb,
	'white-taro': imgWhiteTaro,
	'yellow-taro-2lb': imgYellowTaro2lb,
	'yellow-taro-5lb': imgYellowTaro5lb,
	bele: imgBele,
	duruka: imgDuruka,
	jackfruit: imgJackfruit,
	'taro-leaves': imgTaroLeaves,
	'breadfruit-5lb': imgBreadfruit5lb,
	'tahitian-chestnut-ivi': imgTahitianChestnutIvi,
	'paranthas-plain-value-pack': imgParanthasPlainValuePack,
	'anchor-butter-new-zealand': imgAnchorButterNewZealand,
	'kraft-cheddar-cheese': imgKraftCheddarCheese,
	'tuckers-blitz': imgTuckersBlitz,
	'tucker-blitz-bars': imgTuckerBlitzBars,
	'tuckers-passion-fruit': imgTuckersPassionFruit,
	'tuckers-triple-ripple': imgTuckersTripleRipple,
	'kool-pop': imgKoolPop,
	'bula-pop': imgBulaPop,
	'pacific-split': imgPacificSplit,
	'sunquick-tropical-juice-concentrate': imgSunquickTropicalJuiceConcentrate,
	'sunquick-orange-juice-concentrate': imgSunquickOrangeJuiceConcentrate,
	'sunquick-mango-juice-concentrate': imgSunquickMangoJuiceConcentrate,
	'bula-noni-fiji-islands': imgBulaNoniFijiIslands,
	'nestle-smarties-50g': imgNestleSmarties50g,
	'nestle-milkybar-classic-50g': imgNestleMilkybarClassic50g,
	'nestle-kitkat-chunky-milo-44g': imgNestleKitkatChunkyMilo44g,
	'jasons-black-hacks-150g': imgJasonsBlackHacks150g,
	'jasons-clear-mints-150g': imgJasonsClearMints150g,
	'pops-kola-2-5l': imgPopsKola25l,
	'pops-orange-2-5l': imgPopsOrange25l,
	'pops-lime-2-5l': imgPopsLime25l,
	'pops-raspberry-2-5l': imgPopsRaspberry25l,
	'pops-pineapple-2-5l': imgPopsPineapple25l,
	'pops-cordial-kola-1l': imgPopsCordialKola1l,
	'pops-cordial-raspberry-1l': imgPopsCordialRaspberry1l,
	'pops-cordial-orange-1l': imgPopsCordialOrange1l,
	'pops-cordial-pineapple-1l': imgPopsCordialPineapple1l,
	'pops-cordial-lime-1l': imgPopsCordialLime1l,
	'pops-raspberry-can-355ml': imgPopsRaspberryCan355ml,
	'pops-kola-can-355ml': imgPopsKolaCan355ml,
	'pops-orange-can-355ml': imgPopsOrangeCan355ml,
	'pops-pineapple-can-355ml': imgPopsPineappleCan355ml,
	'pops-lime-can-355ml': imgPopsLimeCan355ml,
	'lapana-tongol-chunk-tuna': imgLapanaTongolChunkTuna,
	'old-capital-special-tuna': imgOldCapitalSpecialTuna,
	'sun-bell-tuna': imgSunBellTuna,
	'ovalau-blue-tuna': imgOvalauBlueTuna,
};

export const PRODUCT_IMAGE_PATH_BY_SLUG: Partial<Record<ProductSlug, string>> = {
	'ox-palm-corned-beef-7oz': '/images/ox-palm-corned-beef-7oz.webp',
	'ox-palm-corned-beef-11-5oz': '/images/ox-palm-corned-beef-11-5oz.webp',
	'ox-palm-corned-beef-tapered': '/images/ox-palm-corned-beef-tapered.webp',
	'ox-palm-corned-beef-15oz': '/images/ox-palm-corned-beef-15oz.webp',
	'ox-palm-corned-beef-3lb': '/images/ox-palm-corned-beef-3lb.webp',
	'ox-palm-corned-beef-6lb': '/images/ox-palm-corned-beef-6lb.webp',
	'pacific-corned-beef-7oz': '/images/pacific-corned-beef-7oz.webp',
	'pacific-corned-beef-11-5oz': '/images/pacific-corned-beef-11-5oz.webp',
	'pacific-corned-beef-15oz': '/images/pacific-corned-beef-15oz.webp',
	'pacific-corned-beef-3lb': '/images/pacific-corned-beef-3lb.webp',
	'crown-corned-mutton': '/images/crown-corned-mutton.webp',
	'colonial-corned-mutton-halal': '/images/colonial-corned-mutton-halal.webp',
	'colonial-corned-mutton-regular': '/images/colonial-corned-mutton-regular.webp',
	'globe-corned-mutton-halal': '/images/globe-corned-mutton-halal.webp',
	'angel-mackerel-natural-oil': '/images/angel-mackerel-natural-oil.webp',
	'angel-mackerel-tomato-sauce': '/images/angel-mackerel-tomato-sauce.webp',
	'pacific-ocean-mackerel-natural-oil': '/images/pacific-ocean-mackerel-natural-oil.webp',
	'pacific-ocean-mackerel-tomato-sauce': '/images/pacific-ocean-mackerel-tomato-sauce.webp',
	'777-mackerel-natural-oil': '/images/777-mackerel-natural-oil.webp',
	'777-mackerel-tomato-sauce': '/images/777-mackerel-tomato-sauce.webp',
	'brunswick-sardines-soybean-oil': '/images/brunswick-sardines-soybean-oil.webp',
	'skipper-tuna-vegetable-oil': '/images/skipper-tuna-vegetable-oil.webp',
	'fish-kawa-kawa': '/images/fish-kawa-kawa.png',
	'fish-kawa-kawa-steak-slices': '/images/fish-kawa-kawa-steak-slices.webp',
	'ulavi-parrot-fish': '/images/ulavi-parrot-fish.webp',
	'unicorn-ta': '/images/unicorn-ta.webp',
	kawango: '/images/kawango.png',
	'pacific-taste-coconut-milk-13oz': '/images/pacific-taste-coconut-milk-13oz.webp',
	'pacific-taste-coconut-milk-98oz': '/images/pacific-taste-coconut-milk-98oz.webp',
	'pacific-crown-fiji-coconut-cream': '/images/pacific-crown-fiji-coconut-cream.webp',
	'pacific-crown-breadfruit': '/images/pacific-crown-breadfruit.png',
	'pacific-crown-tahitian-chestnut': '/images/pacific-crown-tahitian-chestnut.webp',
	'watties-spaghetti-tomato-sauce': '/images/watties-spaghetti-tomato-sauce.webp',
	'watties-baked-beans-tomato-sauce': '/images/watties-baked-beans-tomato-sauce.webp',
	'palusami-taro-leaves': '/images/palusami-taro-leaves.webp',
	'pacific-crown-duruka-stalk-brine': '/images/pacific-crown-duruka-stalk-brine.webp',
	'milk-arrowroot': '/images/milk-arrowroot.webp',
	'monte-carlo': '/images/monte-carlo.webp',
	'tim-tam-extra-chocolate': '/images/tim-tam-extra-chocolate.png',
	'tim-tam-chewy-caramel': '/images/tim-tam-chewy-caramel.webp',
	'tim-tam-dark-chocolate': '/images/tim-tam-dark-chocolate.webp',
	'tim-tam-mint': '/images/tim-tam-mint.webp',
	'tim-tam-original': '/images/tim-tam-original.webp',
	'delta-cream': '/images/delta-cream.webp',
	'scotch-finger': '/images/scotch-finger.webp',
	'shortbread-cream': '/images/shortbread-cream.webp',
	'shortbread-plain': '/images/shortbread-plain.webp',
	'punjas-milk-arrowroot': '/images/punjas-milk-arrowroot.webp',
	'fmf-milk-arrowroot': '/images/fmf-milk-arrowroot.webp',
	'fmf-coconut-cookies': '/images/fmf-coconut-cookies.webp',
	'big-sister-light-fruit-cake': '/images/big-sister-light-fruit-cake.webp',
	'big-sister-dark-fruit-cake': '/images/big-sister-dark-fruit-cake.webp',
	'fmf-flour': '/images/fmf-flour.webp',
	'sao-shortbread-cream': '/images/sao-shortbread-cream.webp',
	'fmf-scotch-finger': '/images/fmf-scotch-finger.webp',
	'fmf-breakfast-crackers-13oz': '/images/fmf-breakfast-crackers-13oz.webp',
	'fmf-breakfast-crackers-fine': '/images/fmf-breakfast-crackers-fine.png',
	'fmf-breakfast-crackers-4lb': '/images/fmf-breakfast-crackers-4lb.webp',
	'fmf-breakfast-crackers-11lb': '/images/fmf-breakfast-crackers-11lb.webp',
	'corn-puff-mix': '/images/corn-puff-mix.webp',
	'lakdhi-methai': '/images/lakdhi-methai.webp',
	murkoo: '/images/murkoo.webp',
	'rice-murkoo': '/images/rice-murkoo.webp',
	'desi-mix': '/images/desi-mix.webp',
	'madras-mix': '/images/madras-mix.webp',
	'punjabi-mix': '/images/punjabi-mix.webp',
	'sao-plain': '/images/sao-plain.webp',
	'sao-fine': '/images/sao-fine.webp',
	'sao-mix': '/images/sao-mix.webp',
	'peanut-peas-mix': '/images/peanut-peas-mix.webp',
	'fried-peanuts': '/images/fried-peanuts.webp',
	'fried-peas': '/images/fried-peas.webp',
	'fried-peas-hot': '/images/fried-peas-hot.webp',
	'fiji-mix': '/images/fiji-mix.webp',
	'fix-mix-spicy': '/images/fix-mix-spicy.webp',
	'bongo-cheese-snack-156gr': '/images/bongo-cheese-snack-156gr.png',
	'bongo-cheese-snack-64gr': '/images/bongo-cheese-snack-64gr.png',
	'bongo-cheese-snack-28gr': '/images/bongo-cheese-snack-28gr.png',
	'bongo-chicken-snack-156gr': '/images/bongo-chicken-snack-156gr.png',
	'bongo-chicken-snack-64gr': '/images/bongo-chicken-snack-64gr.png',
	'bongo-chicken-snack-28gr': '/images/bongo-chicken-snack-28gr.png',
	'twistes-cheese-20gr': '/images/twistes-cheese-20gr.png',
	'twistes-cheese-100gr': '/images/twistes-cheese-100gr.png',
	'twistes-cheese-250gr': '/images/twistes-cheese-250gr.png',
	'twistes-cheese-500gr': '/images/twistes-cheese-500gr.png',
	'twistes-sour-cream-100gr': '/images/twistes-sour-cream-100gr.png',
	'twistes-sour-cream-250gr': '/images/twistes-sour-cream-250gr.png',
	'twistes-chicken-20gr': '/images/twistes-chicken-20gr.png',
	'twistes-chicken-100gr': '/images/twistes-chicken-100gr.png',
	'twistes-chicken-250gr': '/images/twistes-chicken-250gr.png',
	'twistes-chicken-500gr': '/images/twistes-chicken-500gr.png',
	'ufo-burger-20gr': '/images/ufo-burger-20gr.png',
	'ufo-burger-100gr': '/images/ufo-burger-100gr.png',
	'ufo-burger-200gr': '/images/ufo-burger-200gr.png',
	'jasons-peanut-ruffs-28gr': '/images/jasons-peanut-ruffs-28gr.png',
	'jasons-peanut-ruffs-64gr': '/images/jasons-peanut-ruffs-64gr.png',
	'jasons-peanut-ruffs-156gr': '/images/jasons-peanut-ruffs-156gr.png',
	'fmf-chow-tomato-flavour': '/images/chow-tomato-flavour.png',
	'fmf-chow-chicken-flavour': '/images/chow-chicken-flavour.png',
	'fmf-chow-curry-flavour': '/images/chow-curry-flavour.png',
	'cadbury-crunchie-bars': '/images/cadbury-crunchie-bars.webp',
	'cadbury-dream-bars': '/images/cadbury-dream-bars.webp',
	'cadbury-fruit-nut': '/images/cadbury-fruit-nut.webp',
	'cadbury-dairy-milk-bar': '/images/cadbury-dairy-milk-bar.webp',
	'homemaid-amra-pickles': '/images/homemaid-amra-pickles.webp',
	'homemaid-kamrak-star-pickle-apple': '/images/homemaid-kamrak-star-pickle-apple.webp',
	'homemaid-kutchla-hot-mango-chutney': '/images/homemaid-kutchla-hot-mango-chutney.webp',
	'homemaid-mango': '/images/homemaid-mango.webp',
	'homemaid-tamarind-chutney': '/images/homemaid-tamarind-chutney.webp',
	'homemaid-bongo-chili': '/images/homemaid-bongo-chili.webp',
	'homemaid-sweet-mango-pickle': '/images/homemaid-sweet-mango-pickle.webp',
	'pacific-choice-curry-powder-mild': '/images/pacific-choice-curry-powder-mild.webp',
	'pacific-choice-curry-powder-hot': '/images/pacific-choice-curry-powder-hot.webp',
	'punjas-curry-powder': '/images/punjas-curry-powder.webp',
	'punjas-haldi-powder-turmeric': '/images/punjas-haldi-powder-turmeric.webp',
	'punjas-hot-masala-17-64oz': '/images/punjas-hot-masala-17-64oz.webp',
	'punjas-hot-masala-2-20lbs': '/images/punjas-hot-masala-2-20lbs.webp',
	'punjas-meat-masala': '/images/punjas-meat-masala.webp',
	'punjas-coconut-oil': '/images/punjas-coconut-oil.webp',
	'punjas-mustard-oil-750ml': '/images/punjas-mustard-oil-750ml.webp',
	'punjas-mustard-oil-2lt': '/images/punjas-mustard-oil-2lt.webp',
	'punjas-mustard-oil-4lt': '/images/punjas-mustard-oil-4lt.webp',
	'punjas-ghee-butter-750ml': '/images/punjas-ghee-butter-750ml.webp',
	'punjas-ghee-butter-2lt': '/images/punjas-ghee-butter-2lt.webp',
	'punjas-vanaspati': '/images/punjas-vanaspati.webp',
	'punjas-ghee-butter-4lt': '/images/punjas-ghee-butter-4lt.webp',
	'natural-coconut-oil-tiara': '/images/natural-coconut-oil-tiara.webp',
	'natural-coconut-oil-frangipani': '/images/natural-coconut-oil-frangipani.webp',
	'natural-coconut-oil-rose': '/images/natural-coconut-oil-rose.webp',
	'natural-coconut-oil-infusion': '/images/natural-coconut-oil-infusion.webp',
	'natural-coconut-oil-sandalwood': '/images/natural-coconut-oil-sandalwood.webp',
	'weetbix-breakfast-cereal-13oz': '/images/weetbix-breakfast-cereal-13oz.webp',
	'weetbix-breakfast-cereal-20oz': '/images/weetbix-breakfast-cereal-20oz.webp',
	'weetbix-breakfast-cereal-2lb': '/images/weetbix-breakfast-cereal-2lb.webp',
	'fufu-mix-plantain-flour': '/images/fufu-mix-plantain-flour.webp',
	'fufu-mix-cocoyam-flour': '/images/fufu-mix-cocoyam-flour.webp',
	'edmonds-custard-powder': '/images/edmonds-custard-powder.png',
	'rewa-full-cream-milk-powder': '/images/rewa-full-cream-milk-powder.webp',
	'milo-powder-singapore-14oz': '/images/milo-powder-singapore-14oz.webp',
	'milo-powder-singapore-3lb': '/images/milo-powder-singapore-3lb.webp',
	'kava-lawena-powder': '/images/kava-lawena-powder.png',
	'kava-waka-powder': '/images/kava-waka-powder.png',
	'nestle-cocoa': '/images/nestle-cocoa.webp',
	'punjas-ceylon-black-tea-200gr': '/images/punjas-ceylon-black-tea-200gr.webp',
	'punjas-tea-masala': '/images/punjas-tea-masala.webp',
	'lamb-shoulder-whole': '/images/lamb-shoulder-whole.webp',
	'lamb-shoulder-chops': '/images/lamb-shoulder-chops.png',
	'lamb-shoulder-chops-prepack': '/images/lamb-shoulder-chops-prepack.png',
	'lamb-neck-whole': '/images/lamb-neck-whole.webp',
	'lamb-neck-sliced': '/images/lamb-neck-sliced.webp',
	'lamb-leg-whole': '/images/lamb-leg-whole.webp',
	'lamb-leg-sliced-prepack': '/images/lamb-leg-sliced-prepack.webp',
	'lamb-flap-whole': '/images/lamb-flap-whole.png',
	'lamb-shank-whole': '/images/lamb-shank-whole.webp',
	'lamb-shank-sliced-prepack': '/images/lamb-shank-sliced-prepack.png',
	'australian-goat-whole': '/images/australian-goat-whole.png',
	'australian-goat-diced-prepack': '/images/australian-goat-diced-prepack.png',
	'chicken-sausage': '/images/chicken-sausage.webp',
	'chicken-sausage-hot': '/images/chicken-sausage-hot.webp',
	'lamb-sausage-2lb': '/images/lamb-sausage-2lb.webp',
	'lamb-sausage-hot': '/images/lamb-sausage-hot.webp',
	'samoan-beef-bangers': '/images/samoan-beef-bangers.webp',
	'samoan-pork-bangers': '/images/samoan-pork-bangers.webp',
	'muscovy-duck-halal': '/images/muscovy-duck-halal.png',
	'povi-masima': '/images/povi-masima.png',
	'turkey-tails': '/images/turkey-tails.png',
	'fresh-taro': '/images/fresh-taro.png',
	'yellow-cassava-2lb': '/images/yellow-cassava-2lb.webp',
	'white-cassava-5lb': '/images/white-cassava-5lb.webp',
	'white-cassava-2lb': '/images/white-cassava-2lb.webp',
	'pink-taro': '/images/pink-taro.webp',
	'purple-taro-2lb': '/images/purple-taro-2lb.webp',
	'purple-taro-5lb': '/images/purple-taro-5lb.webp',
	'white-taro': '/images/white-taro.webp',
	'yellow-taro-2lb': '/images/yellow-taro-2lb.webp',
	'yellow-taro-5lb': '/images/yellow-taro-5lb.webp',
	bele: '/images/bele.webp',
	duruka: '/images/duruka.webp',
	jackfruit: '/images/jackfruit.webp',
	'taro-leaves': '/images/taro-leaves.webp',
	'breadfruit-5lb': '/images/breadfruit-5lb.webp',
	'tahitian-chestnut-ivi': '/images/tahitian-chestnut-ivi.webp',
	'paranthas-plain-value-pack': '/images/paranthas-plain-value-pack.webp',
	'anchor-butter-new-zealand': '/images/anchor-butter-new-zealand.webp',
	'kraft-cheddar-cheese': '/images/kraft-cheddar-cheese.png',
	'tuckers-blitz': '/images/tuckers-blitz.webp',
	'tucker-blitz-bars': '/images/tucker-blitz-bars.webp',
	'tuckers-passion-fruit': '/images/tuckers-passion-fruit.webp',
	'tuckers-triple-ripple': '/images/tuckers-triple-ripple.webp',
	'kool-pop': '/images/kool-pop.png',
	'bula-pop': '/images/bula-pop.png',
	'pacific-split': '/images/pacific-split.png',
	'sunquick-tropical-juice-concentrate': '/images/sunquick-tropical-juice-concentrate.webp',
	'sunquick-orange-juice-concentrate': '/images/sunquick-orange-juice-concentrate.webp',
	'sunquick-mango-juice-concentrate': '/images/sunquick-mango-juice-concentrate.webp',
	'bula-noni-fiji-islands': '/images/bula-noni-fiji-islands.webp',
	'nestle-smarties-50g': '/images/nestle-smarties-50g.png',
	'nestle-milkybar-classic-50g': '/images/nestle-milkybar-classic-50g.png',
	'nestle-kitkat-chunky-milo-44g': '/images/nestle-kitkat-chunky-milo-44g.png',
	'jasons-black-hacks-150g': '/images/jasons-black-hacks-150g.png',
	'jasons-clear-mints-150g': '/images/jasons-clear-mints-150g.png',
	'pops-kola-2-5l': '/images/pops-kola-2-5l.png',
	'pops-orange-2-5l': '/images/pops-orange-2-5l.png',
	'pops-lime-2-5l': '/images/pops-lime-2-5l.png',
	'pops-raspberry-2-5l': '/images/pops-raspberry-2-5l.png',
	'pops-pineapple-2-5l': '/images/pops-pineapple-2-5l.png',
	'pops-cordial-kola-1l': '/images/pops-cordial-kola-1l.webp',
	'pops-cordial-raspberry-1l': '/images/pops-cordial-raspberry-1l.webp',
	'pops-cordial-orange-1l': '/images/pops-cordial-orange-1l.png',
	'pops-cordial-pineapple-1l': '/images/pops-cordial-pineapple-1l.png',
	'pops-cordial-lime-1l': '/images/pops-cordial-lime-1l.webp',
	'pops-raspberry-can-355ml': '/images/pops-raspberry-can-355ml.png',
	'pops-kola-can-355ml': '/images/pops-kola-can-355ml.png',
	'pops-orange-can-355ml': '/images/pops-orange-can-355ml.png',
	'pops-pineapple-can-355ml': '/images/pops-pineapple-can-355ml.png',
	'pops-lime-can-355ml': '/images/pops-lime-can-355ml.png',
	'lapana-tongol-chunk-tuna': '/images/lapana-tongol-chunk-tuna.png',
	'old-capital-special-tuna': '/images/old-capital-special-tuna.png',
	'sun-bell-tuna': '/images/sun-bell-tuna.png',
	'ovalau-blue-tuna': '/images/ovalau-blue-tuna.png',
};

export const MISSING_PRODUCT_IMAGE_SLUGS = ['lamb-neck-sliced-prepack', 'roosters-halal'] as const;
