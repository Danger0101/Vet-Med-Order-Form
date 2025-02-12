import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Combobox } from "../components/combo";
import "../css/order-form.css";

const medOptions = [
  "ACECARE 2MG/ML SOL INJ DOG/CAT (20ml)",
  "ACTIVATED CHARCOAL SOLUBLE (1L)",
  "ACULAR OPHTH SOL (5ml)",
  "ADVOCATE 10-25kg (PK 6)",
  "ALFAXAN MULTIDOSE INJ DOG/CAT/RAB (10ml)",
  "AMODIP TABS 1.25MG BLISTER (PK 100)",
  "ANESKETIN INJ (CD SCH 2) (5ml)",
  "APOQUEL TABS 16MG (PK 100)",
  "APOQUEL TABS 3.6MG (PK 100)",
  "APOQUEL TABS 5.4MG (PK 100)",
  "AQUPHARM HARTMANNS SOLUTION (250ml)",
  "ATIPAM INJ (5ml)",
  "AURIZON EAR DROPS (10ml)",
  "AURIMIC EAR DROPS+CUTANEOUS SUSP (20ml)",
  "AZITHROMYCIN 200MG/5ML (15ml)",
  "AURIZON EAR DROPS (20ml)",
  "BAYTRIL FLAVOUR TABS 50MG (PK 100)",
  "BACKHOME MINI MICROCHIPS ONLINE (PK 10)",
  "BRAVECTO CAT SPOT-ON 112.5MG (1D)",
  "BISOLVON SACH 5G (PK 40)",
  "BRAVECTO DOG TAB LGE 1000MG (1D)",
  "BRAVECTO DOG SPOT-ON 250MG (1D)",
  "BRAVECTO DOG TAB SML 250MG (1D)",
  "BRAVECTO DOG TAB MED 500MG (1D)",
  "BRAVECTO DOG TAB XL 1400MG (2D)",
  "BRAVECTO DOG TAB XL 1400MG (1D)",
  "BRAVECTO PLUS CAT 112.5MG (1D)",
  "BRAVECTO DOG TAB XS 112.5MG (1D)",
  "BRAVECTO PLUS CAT 500MG 1X1D",
  "BRAVECTO PLUS CAT 250MG 1X1D",
  "BUPREDINE M/DOSE BTL (CD SCH 3) (10ml)",
  "BUPIVACAINE STERI-PK AMP 0.25% (5x10ml)",
  "CANAURAL DROPS (25ml)",
  "CALCIUM GLUCONATE 10%INJ 10ml (PK10)",
  "CANIGEN DHPPI (50D)",
  "CANAURAL DROPS (15ml)",
  "CANIGEN LEPTO 2 (10D)",
  "CANIGEN KC (5D)",
  "CANIGEN RABIES (1D)",
  "CANIGEN LEPTO 4 (PK 50)",
  "CARBODOTE ORAL SUSP (100ml)",
  "Caninsulin (10x2.5ml)",
  "CARDISURE TABS  2.5MG (PK 100)",
  "CARDALIS TABS MED (5MG/40MG) (PK 30)",
  "CERENIA TABS  60MG (DOG) (PK 4)",
  "CERENIA TABS  24MG (DOG) (PK 4)",
  "CERENIA TABS 16MG (DOG) (PK 4)",
  "CERENIA TABS 160MG (DOG) (PK 4)",
  "Clamoxyl LA (100ml)",
  "Chlorambucil 2mg (PK 25)",
  "CLAVUDALE TABS 400MG/100MG (PK 120)",
  "CLAVUDALE TABS 200MG/50MG (PK 120)",
  "CLEANAURAL EAR CLEANER DOG (50ml)",
  "CLEANAURAL EAR CLEANER CAT (50ml)",
  "CLEVOR EYE DROPS VET 0.6ML GB (PK 3)",
  "CLEANAURAL EAR CLEANER DOG (100ml)",
  "CLS DENTAL SOLUTION IM3 (250ml)",
  "CLOMICALM TABS 5MG (PK 30)",
  "CLX WIPES (PK 20)",
  "CLX WIPES (PK 40)",
  "CONVENIA INJ 80MG/ML (10ml)",
  "COMFORTAN INJ (CD SCH 2) (5ml)",
  "CORVENTAL D CAPS 100MG (PK 100)",
  "CORTOTIC EAR SPRAY SOL (16ml)",
  "COSACTHEN 0.25 MG/ML (1ml)",
  "CORVENTAL D CAPS 200MG (PK 100)",
  "CREDELIO CHEW TABS CAT 48MG (PK 6)",
  "CREDELIO CHEW TABS CAT 12MG (PK 6)",
  "CREDELIO PLUS MED DOG >5.5-11KG (PK 6)",
  "CREDELIO PLUS LARGE DOG >11-22KG (PK 6)",
  "CREDELIO PLUS X LARGE DOG >22-45KG (PK 6)",
  "CREDELIO PLUS SMALL DOG >2.8-5.5KG (PK 6)",
  "CYSTOPHAN CAPS (PK 30)",
  "CREDELIO PLUS X SMALL DOG 1.4-2.8KG (PK 6)",
  "CYTOPOINT INJ 20MG VIAL (PK 2)",
  "CYTOPOINT INJ 10MG VIAL (PK 2)",
  "CYTOPOINT INJ 40MG VIAL (PK 2)",
  "CYTOPOINT INJ 30MG VIAL (PK 2)",
  "DAXOCOX 100MG (4 TAB)",
  "CYTOPOINT INJ 40MG VIAL (PK 2)",
  "DEPO MEDRONE INJ (VET) (5ml)",
  "DENAMARIN 90 (PK 30)",
  "DEXADRESON (50ml)",
  "Depo Medrone Inj 40mg/ml (2ml)",
  "DOPAMINE INJ AMP 200MG/5ML (10x5ml)",
  "DIMAZON SOL 5% (LASIX) (10ml)",
  "DOXYCARE TABS 200MG (PK 100)",
  "DOXYCARE TABS 40MG (PK 100)",
  "DRONCIT TABS 50MG  (PK 104)",
  "DUO-TOX PASTE  (30ml)",
  "EASOTIC EAR DROPS (10ml)",
  "EFFIPRO SPRAY (500ml)",
  "EMEDOG 1MG/ML SOL FOR INJ (5x1ml)",
  "EMEPRID INJ (10ml)",
  "EMEPRID ORAL SUSP  (125ml)",
  "Epiotic (60ml)",
  "EPIPHEN SOL 40MG/ML (CD SCH 3) (30ml)",
  "EPIREPRESS TABS 60MG (CD SCH 3)  (PK 30)",
  "ERADIA ORAL SUSP (30ml)",
  "EXOCIN EYE DROPS (5ml)",
  "EYE WASH PODS 20ML  (PK 25)",
  "FELIGEN RCP (10D)",
  "FELIGEN RCP (50D)",
  "flixotide 50 micrograms evohaler  (PK 1)",
  "FLUOXETINE ORAL SOL 20MG/5ML (70ml)",
  "FORTEKOR FLAVOUR 2.5MG (28TAB)",
  "FORTEKOR FLAVOUR 20MG (28TAB)",
  "FORTEKOR FLAVOUR 5MG (28TAB)",
  "GABAPENTIN CAPS 100MG (CD SCH 3) (PK 100)",
  "GABAPENTIN CAPS 300MG (CD SCH 3) (PK 100)",
  "GLYCOPYRRONIUM BROMIDE INJ 0.2MG (10 x 1ml)",
  "HARTMANNS SOLUTION (500ML x 20)",
  "HARTMANNS SOLUTION  (1000ml x 10)",
  "HARTMANNS SOLUTION (plastic pouch) (1000ml)",
  "HEPARIN SOD AMP 1000IU/ML (PK 10)",
  "HEXARINSE (237ml)",
  "HYDROGEN PEROXIDE 6% SELECT (500ml)",
  "HYDROXOCOBALAMIN INJ 1MG/ML (PK 5)",
  "HYPOVASE TABS 500MCG (PK 60)",
  "INCURIN TABS (PK 30)",
  "INDOREX DEFENCE H/HOLD FLEA SPRAY (1 EA)",
  "INTUBEAZE SPRAY (10ML)",
  "ISADERM GEL (15g)",
  "ISADERM GEL (30g)",
  "ISATHAL (3g)",
  "ISOFANE (250ml)",
  "ITRAFUNGOL ORAL SOL (52ml)",
  "KAMINOX LIQUID (120ml)",
  "KAMINOX LIQUID (60ml)",
  "LACTULOSE SOL 3.3G/5ML ORAL SOUTION (500ml)",
  "LAX A PAST PASTE (70g)",
  "LAXAPET (LAXATIVE) (50g)",
  "LAXATRACT SYRUP 667MG/ML (50ml)",
  "LEUCOFELIGEN FELV/RCP (10D)",
  "LEUCOFELIGEN FELV/RCP (50D)",
  "LEUCOGEN (10D)",
  "LIBEO FLAV TABS 10MG - DOGS (PK 120)",
  "LIBEO FLAV TABS 40MG - DOG (PK 120)",
  "LIBRELA SOL FOR INJ 10MG VIAL (PK 2)",
  "LIBRELA SOL FOR INJ 15MG VIAL (PK 2)",
  "LIBRELA SOL FOR INJ 20MG VIAL (PK 2)",
  "LIBRELA SOL FOR INJ 30MG VIAL (PK 2)",
  "LIBRELA SOL FOR INJ 5MG VIAL (PK 2)",
  "LIQUID PARAFFIN SELECT (500ml)",
  "LOXICOM 1.5MG/ML (32ml)",
  "MALACETIC AURAL EAR CLEANER (118ml)",
  "MALASEB SHAMPOO (250ml)",
  "MARBOCARE 20MG Flav Tabs (PK 100)",
  "MARBOCARE 5MG (PK 100)",
  "MARBOCARE 80MG (PK 72)",
  "MAXITROL EYE DROPS (5ml)",
  "MELOXIDYL INJ 5MG/ML (10ml)",
  "MELOXIDYL ORAL LIQ (100ml)",
  "MELOXIDYL ORAL LIQ (32ml)",
  "MELOXIDYL ORAL LIQ (10ml)",
  "METACAM INJ 0.2% (CAT) (10ml)",
  "METACAM ORAL SUSP CAT+GUINEA PIG (15ml)",
  "METACAM ORAL SUSP CAT+GUINEA PIG (3ml)",
  "METACAM ORAL SUSP CAT+GUINEA PIG (30ml)",
  "METROBACTIN TABS 250MG (PK 100)",
  "METROBACTIN TABS 500MG (PK 100)",
  "Milpro TABS CAT 16/40MG (PK 4)",
  "MILPRO TABS DOG 12.5/125MG  (PK 48)",
  "MILPRO TABS KITTEN/SML CAT 4/10MG (PK 24)",
  "MILPRO TABS CAT 16/40MG  (PK 48)",
  "MILPRO TABS PUPP/SML DOG 2.5/25MG (PK 24)",
  "MINIMS FLUORESCEIN SODIUM 1%  (PK 20)",
  "MINIMS TETRACAINE HCL 0.5% (PK 20)",
  "Naloxone 400 micrograms (PK 10)",
  "NELIO TABS  5MG (CATS) (PK 100)",
  "NELIO TABS  5MG (DOGS) (PK 100)",
  "NEPTRA EAR DROP SOLUTION (10 x 1ml)",
  "Neutrox Mp (1)",
  "Nobivac rabies (1D)",
  "OCRY-GEL EYE GEL (10g)",
  "OMEPRAZOLE CAPS 20MG (PK 28)",
  "ONDANSETRON AMPS 4MG/2ML (PK 5)",
  "ONDANSETRON TABS F/C 4MG (PK 30)",
  "ONSIOR INJ 20MG/ML (CAT/DOG) (20ml)",
  "ONSIOR TABS  5MG (DOG) (PK 30)",
  "ONSIOR TABS  6MG (CAT) (PK 30)",
  "ONSIOR TABS 10MG (DOG) (PK 30)",
  "ONSIOR TABS 20MG (DOG) (PK 30)",
  "ONSIOR TABS 40MG (DOG) (PK 30)",
  "OPHTOCYCLINE EYE OINT (5g)",
  "Optimmune Eye Oint 3.5g (PK 1)",
  "ORALADE GI SUPPORT DOG/CAT 500ML (PK 6)",
  "OTOACT EAR CLEANER (100ml)",
  "OTOCLEAN EAR CLEANER 5ML (PK 18)",
  "OTODINE (100ml)",
  "OTOPROF (100ml)",
  "OTOPROF** (50ml)",
  "PANACUR PASTE SYR CAT/DOG 5G (1)",
  "PANACUR SUSP 10% CAT/DOG (1)",
  "Paracetamol IV (1)",
  "PARDALE V TABS (PK 100)",
  "PARDALE V TABS (PK 500)",
  "PENTOJECT (CD SCH 3) (100ml)",
  "PETOSAN (1)",
  "PEXION TABS 400MG (PK 100)",
  "PHENOBARBITONE AMPS 60MG (CD SCH 3) 10 x 1ml)",
  "POTASSIUM CHLORIDE 15% 10ML (PK 10)",
  "PPVD FORTIFLORA CANINE NUT SUPP (7 x 1g)",
  "PPVD FORTIFLORA CANINE NUT SUPP (30 x 1g)",
  "PPVD FORTIFLORA FELINE NUT SUPP (30 x 1g)",
  "PREDNICARE TABS 1MG (PK 500)",
  "PREDNICARE TABS 5MG (PK 1000)",
  "PREVICOX TABS 227MG (DOG) (PK 30)",
  "PROPALIN (30ml)",
  "PROPOFOL - LIPURO VET (10 x 20ml)",
  "PROPRANOLOL TABS 10MG (PK 28)",
  "PROPRANOLOL TABS 40MG (PK 28)",
  "PROTEXIN COBALAPLEX CAPS (PK 60)",
  "PROTEXIN CYSTOPRO (PK 30)",
  "PROTEXIN PRO FIBRE (500g)",
  "PROTEXIN PRO FIBRE ADVANCED (500g)",
  "PROTEXIN PRO KOLIN ADVANCE CAT 15ML (1ea)",
  "PROTEXIN PRO KOLIN ADVANCE DOG 15ML (1ea)",
  "PROTEXIN PRO KOLIN ADVANCE DOG 30ML (1ea)",
  "PROTEXIN PRO KOLIN ADVANCE DOG 60ML (1ea)",
  "PROTEXIN PRO KOLIN ENTEROGENIC (30 x 4g)",
  "RECICORT EAR DROPS DOG/CAT (20ml)",
  "RECONCILE CHEW TABS 16MG (PK 30)",
  "RECONCILE CHEW TABS 32MG (PK 30)",
  "RECONCILE CHEW TABS 8MG (PK 30)",
  "REMEND CORNEAL REPAIR GEL (10 x 3ml)",
  "REMEND DRY EYE LUBRICANT (4 x 10ml)",
  "RILEXINE PAL TABS  300MG (PK 210)",
  "RILEXINE PAL TABS  75MG  (PK 210)",
  "RILEXINE PAL TABS 600MG (PK 210)",
  "SCHIRMER TEAR TESTS (10 x PK 10)",
  "SEDATOR INJ (10ml)",
  "SOLENSIA SOL FOR INJ 7MG/ML (2 x 1ml)",
  "STOMADINE (30ml)",
  "STROMEASE EYE DROPS 25MG/ML (5ml)",
  "SUPRELORIN  6 IMPLANT (4.7MG) (PK 2)",
  "SUPRELORIN 12 IMPLANT (9.4MG) (PK 2)",
  "SYNULOX PAL DROPS 50MG/ML (15ml)",
  "SYNULOX TABS  50MG - PALATABLE (PK 500)",
  "SYNULOX TABS  50MG - PALATABLE (PK 100)",
  "THYFORON FLAV TABS 200MCG (PK 250)",
  "THYFORON FLAV TABS 400MCG (PK 250)",
  "THYRONORM ORAL SOL 5MG/ML (30ml)",
  "THYRONORM ORAL SOL 5MG/ML (100ml)",
  "TORPHADINE INJ 10MG/ML (10ml)",
  "TRANEXAMIC ACID TABS 500MG (PK 60)",
  "Trazadone 100mg  (PK 56)",
  "TRAZODONE CAPS 50MG (PK 84)",
  "TRAZODONE TABS 150MG (PK 28)",
  "TRIZAURAL SOLUTION (118ml)",
  "URIPET (1ea)",
  "URSODEOXYCHOLIC ACID TABS 150MG (PK 60)",
  "VETASEPT POVIDONE/IODINE A/SOL (500ml)",
  "VETEMEX 10MG/ML INJ (20ml)",
  "VIDALTA TABS 10MG (CAT) (PK 30)",
  "VIDALTA TABS 15MG (CAT) (PK 30)",
  "VITAMIN K1 INJ 5ML  (PK 6)",
  "VOMEND INJ - 10ml",
  "WATER FOR INJ 5ML (PK 10)",
  "XANAX (PK 60)",
  "ZINACEF INJECTION (15ML) (1.5g)",
  "ZINACEF PDR FOR INJ 250MG (PK 5)",
  "ZINACEF PDR FOR INJ 750MG (PK 5)",
  "ZODON CHEW TABS 264MG - DOG (PK 120)",
  "ZODON CHEW TABS 88MG - DOG (PK 120)",
  "ZODON liquid (PK 1)",
  "ZYLKENE CAPS 450MG (PK 20)",
  "ZYLKENE CAPS 75MG (PK 100)",
  "Amantadine HCl 10mg 100 Tablets",
  "Amantadine HCl 25mg 100 Tablets",
  "Amantadine HCl 50mg 100 Tablets",
  "Amantadine HCl 75mg 100 Tablets",
  "Amitriptyline 5mg (flavoured) 100 Tablets",
  "Amlodipine Transdermal Gel 12.5mg/mL (1.25mg/0.1mL) 3 x 1ml Syringes (1 box)",
  "Amlodipine 0.3125mg 100 Tablets",
  "Amlodipine 0.625mg 100 Tablets",
  "Amlodipine 0.625mg 250 Tablets",
  "Atenolol 6.25mg 100 Tablets",
  "Budesonide 1mg 100 Tablets",
  "Buprenorphine 0.2mg/mL Sublingual Solution 10ml Bottle",
  "Buprenorphine 0.2mg/mL Sublingual Solution 30ml Bottle",
  "Buprenorphine 0.8mg/mL Sublingual Solution 10ml Bottle",
  "Buprenorphine 0.8mg/mL Sublingual Solution 30ml Bottle",
  "Cisapride 2.5mg 100 Tablets",
  "Cisapride 5mg 100 Tablets",
  "Cisapride Suspension 5mg/mL (30mL) 30ml Bottle",
  "Clopidogrel 18.75mg 100 Tablets",
  "Dantrolene Sodium 6.25mg  100 Tablets",
  "Doxycycline 50mg/mL Recostitute for Oral Solution 30mL Bottle",
  "Famotidine 5mg 100 Tablets",
  "Fludrocortisone Acetate 0.05mg  100 Tablets",
  "Fludrocortisone Acetate 0.25mg  100 Tablets",
  "Furosemide 10mg 100 Tablets",
  "Gabapentin 25mg 100 Tablets",
  "Gabapentin 25mg 250 Tablets",
  "Gabapentin 50mg 100 Tablets",
  "Gabapentin 50mg 250 Tablets",
  "Gabapentin 60mg/mL Oral Solution (Chicken Flavour) 50mL Bottle",
  "Methimazole Transdermal Gel 50mg/mL (5mg/0.1mL) 3 x 1ml Syringes (1 box)",
  "Metronidazole 25mg 100 Tablets",
  "Metronidazole 50mg 100 Tablets",
  "Metronidazole 50mg 250 Tablets",
  "Metronidazole 100mg 100 Tablets",
  "Mexilitine HCl 50mg 100 Tablets",
  "Mexilitine HCl 100mg  100 Tablets",
  "Mirtazapine 2mg 30 Tablets",
  "Mirtazapine 2mg 100 Tablets",
  "Omeprazole (Buffered) 2.5mg 100 Tablets",
  "Omeprazole (Buffered) 5mg 100 Tablets",
  "PEG 3350 (Polyethylene Glycol) Powder 75g Powder",
  "Phenoxybenzamine HCl 5mg 100 Tablets",
  "Phenoxybenzamine HCl 10mg 100 Tablets",
  "Piroxicam 1.5mg 100 Tablets",
  "Piroxicam 5mg 100 Tablets",
  "Potassium Bromide 300mg/mL 30ml Bottle",
  "Potassium Bromide 300mg/mL 100ml Bottle",
  "Potassium Bromide 300mg/mL 250ml Bottle",
  "Pregabalin 20mg 100 Tablets",
  "Ranitidine HCL 5mg 100 Tablets",
  "Ranitidine HCL 10mg 100 Tablets",
  "Ranitidine HCL 25mg 100 Tablets",
  "Ronidazole 30mg 30 Tablets",
  "Ronidazole 30mg 100 Tablets",
  "Ronidazole 60mg  30 Tablets",
  "Ronidazole 60mg  100 Tablets",
  "Sildenafil 6.25mg 100 Tablets",
  "Sidenafil 10mg 100 Tablets",
  "Sidenafil 12.5mg 100 Tablets",
  "Sotalol HCl 10mg 100 Tablets",
  "Sucralfate 1000mg Tablets 30 Tablets",
  "Tramadol HCl Transdermal Gel 50mg/mL (5mg/0.1mL) 3 x 1ml Syringes (1 box)",
  "Tramadol HCl 5mg/mL Oral Solution (Honey Flavoured) 30ml Bottle",
  "Tramadol HCl 20mg/mL Oral Solution (Honey Flavoured) 30ml Bottle",
  "Tramadol 10mg 100 Tablets",
  "Tramadol 10mg 250 Tablets",
  "Tramadol 25mg 100 Tablets",
  "Tramadol 25mg 250 Tablets",
  "Tramadol 40mg 100 Tablets",
  "Tramadol 75mg 100 Tablets",
  "Terbutaline sulfate",
  "Tylosin 50mg 100 Tablets",
  "Tylosin 100mg 100 Tablets",
  "Ursodiol 50mg 100 Tablets",
  "ACULAR OPHTH SOL ",
  "ADRENALINE AMPS 1/ 1000 1ML",
  "Amantadine hydrochloride 100mg",
  "ATROPINE SULPH 600mcg/1ml",
  "Bupivacaine Steri-pk Amp 0.25%",
  "Bupivacaine Steri-pk Amp 0.5%",
  "Chloramphenicol Eye Drops 0.5% (4pack)",
  "Chloramphenicol Eye Oint 1%",
  "Chlorphenamine Inj 10mg/ml",
  "Depo - medrone",
  "Depo - medrone (10)",
  "DIAZEPAM BP 10MG/2ML(CD SCH 4)",
  "DIAZEPAM RECTUBE 10MG DEST",
  "DIAZEPAM RECTUBES 5MG",
  "DIAZEPAM TABS 10MG(CD SCH 4)",
  "DIAZEPAM TABS 2MG(CD SCH 4)",
  "DIAZEPAM TABS 5MG(CD SCH 4)",
  "Emla Cream 30g",
  "Emla Cream 5g",
  "Exocin Eye Drops",
  "Fluoxetine 20mg/5ml",
  "GABAPENTIN CAPS 100MG (CD SCH 3)",
  "GABAPENTIN CAPS 300MG (CD SCH 3)",
  "GABAPENTIN CAPS 400MG (CD SCH 3)",
  "Glucose 50% Inf Amp 20ml",
  "HYDROXOCOBALAMIN 1mg/1ml INJ AMPS (5) [Vitamin B12]",
  "LEVETIRACETAM 100mg/Ml ORAL SOLUTION (300ml)",
  "LEVETIRACETAM 250mg TABLETS (60)",
  "LEVETIRACETAM 500mg TABLETS (60)",
  "Lidocaine Hydrochloride 2% Inj",
  "Maxidex 0.1%",
  "Maxitrol Eye Drops - no longer available from promedic",
  "Maxitrol Ointment 0.1%",
  "METRONIDAZOLE (5mg/Ml) Solution For Infusion",
  "Micralax Enema",
  "MIDAZOLAM 10mg/2ml INJ AMPS (10) [CD3]",
  "MINIMS ATROPINE SULPH 1%",
  "MINIMS FLUORESCEIN SODIUM 1%",
  "MINIMS PROXYMETACAINE HYD 0.5% SDU Eye Drops 0.5ml (20) (MOQ of 2)",
  "Mirtazapine Tabs 15mg",
  "Omeprazole 10mg (28)",
  "PARACETAMOL 250MG/5ML",
  "Paracetamol Sol For Inf 1g/100ml",
  "Trazadone 100mg",
  "Trazodone 150mg tablets (28)",
  "Trazodone 50mg capsuls (84)",
  "XANAX (ALPRAZOLAM) 500mcg Tablets (60) [CD4Pt1]",
];

export default function VetMedOrderForm() {
  const [user, setUser] = useState("");  // State for name or email
  const [orders, setOrders] = useState([{ med: "", quantity: "" }]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedOptions = medOptions.filter((med) =>
    med.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderChange = (index, field, value) => {
    const newOrders = [...orders];
    newOrders[index][field] = value;
    setOrders(newOrders);
  };

  const addOrder = () => {
    setOrders([...orders, { med: "", quantity: "" }]);
  };

  const removeOrder = (index) => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.trim()) {
      alert("Please enter your name or email for verification.");
      return;
    }

    if (orders.length === 0 || orders.some((o) => !o.med || !o.quantity)) {
      alert("Please add at least one valid medication order.");
      return;
    }

    // Format the email message as plain text
    const formattedMessage = orders
      .map(
        (order) => `
        MEDICATION TO ORDER: ${order.med}
        PLEASE ORDER: ${order.quantity}
        ------------------------`
      )
      .join("\n");

    // Prepare the email data (fields that will be sent to Web3Forms)
    const formData = new FormData();
    formData.append("access_key", "db1c9c3c-bfc8-4159-86e9-d9a3c36ae9e0"); // Public Access Key from Web3Forms
    formData.append("name_or_email", user);  // Added user verification field
    formData.append("message", formattedMessage);

    // Log the form data to debug
    console.log("Form Data:", [...formData]);

    // Send the form data to Web3Forms
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json",
        "Authorization": "db1c9c3c-bfc8-4159-86e9-d9a3c36ae9e0", // Public Access Key from Web3Forms
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response to see more details
        if (data.success) {
          alert("Order submitted successfully!");
        } else {
          alert(`There was an issue submitting your order: ${data.message || data.error}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an issue submitting your order.");
      });
  };

  return (
    <div className="max-w-full sm:max-w-lg mx-auto p-4">
      <Card className="card-container">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              name="user"
              placeholder="Enter your Name or Email for Verification"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="input-field mb-6"
            />
            {orders.map((order, index) => (
              <div key={index} className="form-container mb-4">
                <Combobox
                  name={`med-${index}`}
                  options={filteredMedOptions}
                  placeholder="Select Med"
                  value={order.med}
                  onChange={(value) => handleOrderChange(index, "med", value)}
                  onInputChange={(e) => setSearchTerm(e.target.value)}
                  className="combobox"
                />
                <Input
                  type="number"
                  name={`quantity-${index}`}
                  placeholder="Quantity"
                  value={order.quantity}
                  onChange={(e) => handleOrderChange(index, "quantity", e.target.value)}
                  className="input-field"
                />
                <Button
                  type="button"
                  onClick={() => removeOrder(index)}
                  className="button remove"
                >
                  Remove Med
                </Button>
              </div>
            ))}
            <div className="flex gap-4 mb-4">
              <Button type="button" onClick={addOrder} className="button secondary">
                + Add More
              </Button>
              <Button type="submit" className="button primary">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}