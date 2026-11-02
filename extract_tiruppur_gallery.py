import os
import subprocess
import cv2
import json

PDF_PATH = "/Users/admin/Downloads/Tiruppur Training.pdf"
OUT_BASE = "frontend/public/images/gallery/tiruppur"
CARDS_DIR = os.path.join(OUT_BASE, "cards")
os.makedirs(CARDS_DIR, exist_ok=True)

# 1. Render all 8 sheets at 200 DPI
print("Rendering 8 sheets from PDF...")
subprocess.run([
    "pdftoppm", "-jpeg", "-r", "200",
    PDF_PATH,
    os.path.join(OUT_BASE, "temp_sheet")
], check=True)

for i in range(1, 9):
    src = os.path.join(OUT_BASE, f"temp_sheet-{i}.jpg")
    dst = os.path.join(OUT_BASE, f"sheet_page_{i}.jpg")
    if os.path.exists(src):
        os.rename(src, dst)
        print(f"Saved {dst}")

# 2. Coordinates of 3x3 grid
cols = [
    (105, 575),   # col 0: width 470
    (590, 1060),  # col 1: width 470
    (1075, 1545), # col 2: width 470
]

rows = [
    (236, 845),   # row 0: height 609
    (890, 1499),  # row 1: height 609
    (1545, 2154), # row 2: height 609
]

# Inner photo offset within card (609 x 470)
# Photo starts at y=97, height 424 (ends at 521). x starts at 12, ends at 458.
PHOTO_Y1 = 97
PHOTO_Y2 = 521
PHOTO_X1 = 14
PHOTO_X2 = 456

# School definitions (70 schools)
schools_data = [
    # Page 1 (9 schools)
    {"sheet": 1, "r": 0, "c": 0, "id": "ghss-dharapuram", "name": "GHSS Dharapuram", "location": "Dharapuram, Tiruppur", "cat": "Career Guidance", "students": "150+ Students", "highlight": "Higher education roadmaps & 7.5% Govt School horizontal quota counselling."},
    {"sheet": 1, "r": 0, "c": 1, "id": "ghss-dhalavapattiam", "name": "GHSS Dhalavapattiam", "location": "Dhalavapattiam, Dharapuram", "cat": "Higher Education", "students": "110+ Students", "highlight": "Engineering cut-off analysis, polytechnic entry & zero tuition fee verification."},
    {"sheet": 1, "r": 0, "c": 2, "id": "ghss-alangiam", "name": "GHSS Alangiam", "location": "Alangiam, Dharapuram", "cat": "Soft Skills", "students": "95+ Students", "highlight": "Delicate ability, self-confidence building & communication skills workshop."},
    {"sheet": 1, "r": 1, "c": 0, "id": "ghss-kolathupalayam", "name": "GHSS Kolathupalayam", "location": "Kolathupalayam, Dharapuram", "cat": "Career Guidance", "students": "125+ Students", "highlight": "Commerce, B.Com CA and arts college streams exploration for Class 12 students."},
    {"sheet": 1, "r": 1, "c": 1, "id": "ghss-kundadam", "name": "GHSS Kundadam", "location": "Kundadam, Dharapuram", "cat": "Govt School Quota", "students": "135+ Students", "highlight": "7.5% preferential reservation guidance for medical, engineering & agriculture degrees."},
    {"sheet": 1, "r": 1, "c": 2, "id": "gmhss-kundadam", "name": "GMHSS Kundadam", "location": "Kundadam, Tiruppur", "cat": "Career Guidance", "students": "120+ Students", "highlight": "Science stream career pathways in allied health sciences, nursing and technology."},
    {"sheet": 1, "r": 2, "c": 0, "id": "aaghss-vellakoil", "name": "AAGHSS Vellakoil", "location": "Vellakoil, Kangeyam", "cat": "Higher Education", "students": "160+ Students", "highlight": "Textile technology, engineering choices & scholarship application mentoring."},
    {"sheet": 1, "r": 2, "c": 1, "id": "ghss-muthur", "name": "GHSS Muthur", "location": "Muthur, Kangeyam", "cat": "Soft Skills", "students": "105+ Students", "highlight": "Personality development, interview presence & aptitude test readiness."},
    {"sheet": 1, "r": 2, "c": 2, "id": "ghss-anupparpalayam", "name": "GHSS Anupparpalayam", "location": "Anupparpalayam, Tiruppur City", "cat": "Govt School Quota", "students": "180+ Students", "highlight": "Comprehensive higher secondary career orientation in the central industrial hub."},

    # Page 2 (9 schools)
    {"sheet": 2, "r": 0, "c": 0, "id": "gbhss-udumalpettai", "name": "GBHSS Udumalpettai", "location": "Udumalpet, Tiruppur", "cat": "Career Guidance", "students": "175+ Students", "highlight": "Technical degree pathways, TNEA choice filling and collegiate scholarship orientation."},
    {"sheet": 2, "r": 0, "c": 1, "id": "ghss-vadugapatti", "name": "GHSS Vadugapatti", "location": "Vadugapatti, Tiruppur", "cat": "Higher Education", "students": "90+ Students", "highlight": "Rural student empowerment and first graduate certificate benefits awareness."},
    {"sheet": 2, "r": 0, "c": 2, "id": "ghss-pudhupai", "name": "GHSS Pudhupai", "location": "Pudhupai, Dharapuram", "cat": "Govt School Quota", "students": "115+ Students", "highlight": "Special counselling on zero-fee Anna University and govt college admissions."},
    {"sheet": 2, "r": 1, "c": 0, "id": "narayanasamy-ghss-periyavalavadi", "name": "Narayanasamy GHSS Periyavalavadi", "location": "Periyavalavadi, Udumalpet", "cat": "Career Guidance", "students": "140+ Students", "highlight": "Emerging careers in artificial intelligence, software & modern sciences."},
    {"sheet": 2, "r": 1, "c": 1, "id": "ghss-thekkalur", "name": "GHSS Thekkalur", "location": "Thekkalur, Avinashi", "cat": "Soft Skills", "students": "130+ Students", "highlight": "Empowering youth from weaver families with leadership, etiquette & presentation skills."},
    {"sheet": 2, "r": 1, "c": 2, "id": "ghss-elugamvalasu", "name": "GHSS Elugamvalasu", "location": "Elugamvalasu, Dharapuram", "cat": "Higher Education", "students": "85+ Students", "highlight": "Higher education entrance tests, polytechnic diplomas & college scholarships."},
    {"sheet": 2, "r": 2, "c": 0, "id": "gghss-avinashi", "name": "GGHSS Avinashi", "location": "Avinashi, Tiruppur", "cat": "Soft Skills", "students": "210+ Students", "highlight": "Pudhumai Penn scheme awareness, girls collegiate education & women safety drives."},
    {"sheet": 2, "r": 2, "c": 1, "id": "gbhss-avinashi", "name": "GBHSS Avinashi", "location": "Avinashi, Tiruppur", "cat": "Career Guidance", "students": "195+ Students", "highlight": "Vocational and technical career options, competitive exam awareness & IT degrees."},
    {"sheet": 2, "r": 2, "c": 2, "id": "ghss-devanurpudur", "name": "GHSS Devanurpudur", "location": "Devanurpudur, Udumalpet", "cat": "Govt School Quota", "students": "100+ Students", "highlight": "Guidance on agricultural sciences, veterinary studies & state scholarship schemes."},

    # Page 3 (9 schools)
    {"sheet": 3, "r": 0, "c": 0, "id": "ghss-jallipatti", "name": "GHSS Jallipatti", "location": "Jallipatti, Udumalpet", "cat": "Career Guidance", "students": "120+ Students", "highlight": "Step-by-step career mapping for rural youth after Class 10 and 12."},
    {"sheet": 3, "r": 0, "c": 1, "id": "snghss-elayamuthur", "name": "SNGHSS Elayamuthur", "location": "Elayamuthur, Udumalpet", "cat": "Higher Education", "students": "110+ Students", "highlight": "Demystifying college counselling deadlines, online portals & quota documents."},
    {"sheet": 3, "r": 0, "c": 2, "id": "bcghss-udumalpettai", "name": "BCGHSS Udumalpettai", "location": "Udumalpet, Tiruppur", "cat": "Soft Skills", "students": "165+ Students", "highlight": "Self-confidence building, mental agility and career readiness seminar."},
    {"sheet": 3, "r": 1, "c": 0, "id": "ghss-kannivadi", "name": "GHSS Kannivadi", "location": "Kannivadi, Dharapuram", "cat": "Govt School Quota", "students": "105+ Students", "highlight": "7.5% quota fee waiver awareness & hostel stipend application support."},
    {"sheet": 3, "r": 1, "c": 1, "id": "ghss-ramachandrapuram", "name": "GHSS Ramachandrapuram", "location": "Ramachandrapuram, Tiruppur", "cat": "Career Guidance", "students": "115+ Students", "highlight": "Job opportunities in banking, government sectors, chartered accountancy & IT."},
    {"sheet": 3, "r": 1, "c": 2, "id": "ghss-pethappampatti", "name": "GHSS Pethappampatti", "location": "Pethappampatti, Udumalpet", "cat": "Higher Education", "students": "145+ Students", "highlight": "Science & commerce degree guidance with complete college cut-off analysis."},
    {"sheet": 3, "r": 2, "c": 0, "id": "ghss-karuvallur", "name": "GHSS Karuvallur", "location": "Karuvallur, Avinashi", "cat": "Soft Skills", "students": "130+ Students", "highlight": "Delicate ability coaching, effective communication & interview etiquette."},
    {"sheet": 3, "r": 2, "c": 1, "id": "ghss-cheyur", "name": "GHSS Cheyur", "location": "Cheyur, Avinashi", "cat": "Career Guidance", "students": "125+ Students", "highlight": "Engineering, arts & design pathways for first-generation school students."},
    {"sheet": 3, "r": 2, "c": 2, "id": "ghss-poolavadi", "name": "GHSS Poolavadi", "location": "Poolavadi, Dharapuram", "cat": "Govt School Quota", "students": "95+ Students", "highlight": "Zero documentation fee verification & full scholarship counselling."},

    # Page 4 (9 schools)
    {"sheet": 4, "r": 0, "c": 0, "id": "ghss-periyapalayam", "name": "GHSS Periyapalayam", "location": "Periyapalayam, Tiruppur City", "cat": "Career Guidance", "students": "150+ Students", "highlight": "Urban corporation school guidance on modern computer degrees & diploma courses."},
    {"sheet": 4, "r": 0, "c": 1, "id": "ghss-kannur-pudur", "name": "GHSS Kannur Pudur", "location": "Kannur Pudur, Tiruppur", "cat": "Higher Education", "students": "90+ Students", "highlight": "College admission choice ordering and state scholarship paperwork assistance."},
    {"sheet": 4, "r": 0, "c": 2, "id": "ghss-gudimangalam", "name": "GHSS Gudimangalam", "location": "Gudimangalam, Udumalpet", "cat": "Govt School Quota", "students": "135+ Students", "highlight": "Detailed session on 7.5% medical & engineering reservation requirements."},
    {"sheet": 4, "r": 1, "c": 0, "id": "ghss-rajendra-road", "name": "GHSS Rajendra Road", "location": "Rajendra Road, Udumalpet", "cat": "Soft Skills", "students": "110+ Students", "highlight": "Youth empowerment, personality enhancement & public speaking training."},
    {"sheet": 4, "r": 1, "c": 1, "id": "gbhss-perumanallur", "name": "GBHSS Perumanallur", "location": "Perumanallur, Tiruppur", "cat": "Career Guidance", "students": "160+ Students", "highlight": "Technical disciplines, mechanical, electrical and AI software careers overview."},
    {"sheet": 4, "r": 1, "c": 2, "id": "gghss-perumanallur", "name": "GGHSS Perumanallur", "location": "Perumanallur, Tiruppur", "cat": "Soft Skills", "students": "170+ Students", "highlight": "Inspiring female students to pursue higher professional degrees and leadership roles."},
    {"sheet": 4, "r": 2, "c": 0, "id": "ghss-moolanur", "name": "GHSS Moolanur", "location": "Moolanur, Dharapuram", "cat": "Higher Education", "students": "130+ Students", "highlight": "Agriculture, dairy farming sciences, biotechnology & polytechnic admissions."},
    {"sheet": 4, "r": 2, "c": 1, "id": "gmhss-moolanur", "name": "GMHSS Moolanur", "location": "Moolanur, Dharapuram", "cat": "Career Guidance", "students": "120+ Students", "highlight": "Commerce stream banking career guidance and chartered accountant coaching."},
    {"sheet": 4, "r": 2, "c": 2, "id": "gghss-palladam", "name": "GGHSS Palladam", "location": "Palladam, Tiruppur", "cat": "Govt School Quota", "students": "220+ Students", "highlight": "Higher education roadmap convention for girl students from garment worker families."},

    # Page 5 (9 schools)
    {"sheet": 5, "r": 0, "c": 0, "id": "gghss-uthukuli", "name": "GGHSS Uthukuli", "location": "Uthukuli, Tiruppur", "cat": "Career Guidance", "students": "180+ Students", "highlight": "Degree pathways, professional skill courses & college fee concession awareness."},
    {"sheet": 5, "r": 0, "c": 1, "id": "gbhss-uthukuli", "name": "GBHSS Uthukuli", "location": "Uthukuli, Tiruppur", "cat": "Higher Education", "students": "175+ Students", "highlight": "Engineering cut-offs, diploma lateral entry & polytechnic admission steps."},
    {"sheet": 5, "r": 0, "c": 2, "id": "ghss-koduvai", "name": "GHSS Koduvai", "location": "Koduvai, Kangeyam", "cat": "Govt School Quota", "students": "150+ Students", "highlight": "7.5% horizontal reservation benefits in premier government engineering colleges."},
    {"sheet": 5, "r": 1, "c": 0, "id": "ghss-mangalam", "name": "GHSS Mangalam", "location": "Mangalam, Tiruppur", "cat": "Soft Skills", "students": "140+ Students", "highlight": "Communication mastery, interview confidence & youth motivation session."},
    {"sheet": 5, "r": 1, "c": 1, "id": "ghss-vellakovil", "name": "GHSS Vellakovil", "location": "Vellakoil, Kangeyam", "cat": "Career Guidance", "students": "165+ Students", "highlight": "Commerce, accounting, textile management & science stream career maps."},
    {"sheet": 5, "r": 1, "c": 2, "id": "ghss-saravanampuram", "name": "GHSS Saravanampuram", "location": "Saravanampuram, Tiruppur", "cat": "Higher Education", "students": "100+ Students", "highlight": "College cut-off analysis and zero-cost admission verification assistance."},
    {"sheet": 5, "r": 2, "c": 0, "id": "ghss-pollikalipalayam", "name": "GHSS Pollikalipalayam", "location": "Pollikalipalayam, Tiruppur", "cat": "Govt School Quota", "students": "135+ Students", "highlight": "First graduate fee reduction and free college transport eligibility guidance."},
    {"sheet": 5, "r": 2, "c": 1, "id": "ghss-samigoundampalayam", "name": "GHSS Samigoundampalayam", "location": "Samigoundampalayam, Tiruppur", "cat": "Career Guidance", "students": "115+ Students", "highlight": "Technical diplomas, polytechnic routes and IT skills for rural students."},
    {"sheet": 5, "r": 2, "c": 2, "id": "gbhss-palladam", "name": "GBHSS Palladam", "location": "Palladam, Tiruppur", "cat": "Soft Skills", "students": "190+ Students", "highlight": "Delicate ability, goal setting and interview communication seminar."},

    # Page 6 (9 schools)
    {"sheet": 6, "r": 0, "c": 0, "id": "ghss-vijayapuram", "name": "GHSS Vijayapuram", "location": "Vijayapuram, Tiruppur", "cat": "Career Guidance", "students": "160+ Students", "highlight": "Computer science, AI, data science degrees & industry career readiness."},
    {"sheet": 6, "r": 0, "c": 1, "id": "ghss-kangeyam", "name": "GHSS Kangeyam", "location": "Kangeyam, Tiruppur", "cat": "Higher Education", "students": "170+ Students", "highlight": "Agriculture, engineering cut-off consultation & merit scholarship drives."},
    {"sheet": 6, "r": 0, "c": 2, "id": "ghss-padiyur", "name": "GHSS Padiyur", "location": "Padiyur, Kangeyam", "cat": "Govt School Quota", "students": "110+ Students", "highlight": "Guiding 7.5% quota applicants with single-window admission documents."},
    {"sheet": 6, "r": 1, "c": 0, "id": "nanjappa-mpl-boys-hss", "name": "Nanjappa Mpl Boys HSS", "location": "Tiruppur City", "cat": "Career Guidance", "students": "240+ Students", "highlight": "Mega career counselling convention in Tiruppur's historic municipal high school."},
    {"sheet": 6, "r": 1, "c": 1, "id": "ghss-arulpuram", "name": "GHSS Arulpuram", "location": "Arulpuram, Tiruppur", "cat": "Soft Skills", "students": "145+ Students", "highlight": "Empowering youth from garment families with confidence & communication skill."},
    {"sheet": 6, "r": 1, "c": 2, "id": "mhss-padmavathipuram", "name": "MHSS Padmavathipuram", "location": "Padmavathipuram, Tiruppur", "cat": "Higher Education", "students": "130+ Students", "highlight": "Arts, science & commerce degree admissions with fee concession verification."},
    {"sheet": 6, "r": 2, "c": 0, "id": "ghss-kanakkampalayam", "name": "GHSS Kanakkampalayam", "location": "Kanakkampalayam, Tiruppur", "cat": "Govt School Quota", "students": "125+ Students", "highlight": "Special desk for 7.5% government school preferential quota verification."},
    {"sheet": 6, "r": 2, "c": 1, "id": "palaniammal-mghs-tiruppur", "name": "Palaniammal MGHS Tiruppur", "location": "Tiruppur City", "cat": "Soft Skills", "students": "180+ Students", "highlight": "Girls motivation, higher education enrollment & life skills workshop."},
    {"sheet": 6, "r": 2, "c": 2, "id": "chinnasamy-ammal-bmhss", "name": "Chinnasamy Ammal BMHSS", "location": "Tiruppur City", "cat": "Career Guidance", "students": "155+ Students", "highlight": "Vocational course streams, ITI certifications & polytechnic career guidance."},

    # Page 7 (9 schools)
    {"sheet": 7, "r": 0, "c": 0, "id": "ghss-madathukulam", "name": "GHSS Madathukulam", "location": "Madathukulam, Udumalpet", "cat": "Career Guidance", "students": "165+ Students", "highlight": "Rural education drive on engineering cut-offs, agriculture & veterinary sciences."},
    {"sheet": 7, "r": 0, "c": 1, "id": "ghss-peruntholuvu", "name": "GHSS Peruntholuvu", "location": "Peruntholuvu, Tiruppur", "cat": "Higher Education", "students": "115+ Students", "highlight": "Online admission portals, community certificates & scholarship guidance."},
    {"sheet": 7, "r": 0, "c": 2, "id": "ksc-gbhss-tiruppur", "name": "KSC GBHSS Tiruppur", "location": "Tiruppur City", "cat": "Career Guidance", "students": "210+ Students", "highlight": "Comprehensive higher secondary career roadmap seminar for urban students."},
    {"sheet": 7, "r": 1, "c": 0, "id": "ghss-komaralingam", "name": "GHSS Komaralingam", "location": "Komaralingam, Madathukulam", "cat": "Govt School Quota", "students": "130+ Students", "highlight": "7.5% government school quota choice filling and fee exemption paperwork."},
    {"sheet": 7, "r": 1, "c": 1, "id": "ghss-iduvampalayam", "name": "GHSS Iduvampalayam", "location": "Iduvampalayam, Tiruppur", "cat": "Soft Skills", "students": "140+ Students", "highlight": "Delicate ability training and workplace communication for graduating batch."},
    {"sheet": 7, "r": 1, "c": 2, "id": "ghss-avanakkipalayam", "name": "GHSS Avanakkipalayam", "location": "Avanakkipalayam, Tiruppur", "cat": "Higher Education", "students": "120+ Students", "highlight": "Polytechnic lateral entry counselling & direct diploma to degree admissions."},
    {"sheet": 7, "r": 2, "c": 0, "id": "ghss-kunnathur", "name": "GHSS Kunnathur", "location": "Kunnathur, Uthukuli", "cat": "Career Guidance", "students": "150+ Students", "highlight": "Higher education awareness, cut-off calculators & college placement roadmap."},
    {"sheet": 7, "r": 2, "c": 1, "id": "mhss-kumar-nagar", "name": "MHSS Kumar Nagar", "location": "Kumar Nagar, Tiruppur City", "cat": "Govt School Quota", "students": "175+ Students", "highlight": "Corporation school guidance on merit quotas, hostel subsidies & degree admissions."},
    {"sheet": 7, "r": 2, "c": 2, "id": "mhss-puthu-ramakrishnapuram", "name": "MHSS Puthu Ramakrishnapuram", "location": "Tiruppur City", "cat": "Soft Skills", "students": "135+ Students", "highlight": "Self-esteem, interpersonal communication & interview skills development."},

    # Page 8 (7 schools)
    {"sheet": 8, "r": 0, "c": 0, "id": "ghss-kethanur", "name": "GHSS Kethanur", "location": "Kethanur, Palladam", "cat": "Career Guidance", "students": "125+ Students", "highlight": "Career guidance on agriculture, engineering & commerce courses in rural Tiruppur."},
    {"sheet": 8, "r": 0, "c": 1, "id": "ghss-veerapandi", "name": "GHSS Veerapandi", "location": "Veerapandi, Tiruppur", "cat": "Higher Education", "students": "150+ Students", "highlight": "Textile, technology & management degrees guidance for industrial sector youth."},
    {"sheet": 8, "r": 0, "c": 2, "id": "ghss-karatholuvu", "name": "GHSS Karatholuvu", "location": "Karatholuvu, Madathukulam", "cat": "Govt School Quota", "students": "110+ Students", "highlight": "7.5% quota fee waiver awareness & hostel stipend application support."},
    {"sheet": 8, "r": 1, "c": 0, "id": "smghss-suriyappampalayam", "name": "SMGHSS Suriyappampalayam", "location": "Suriyappampalayam, Tiruppur", "cat": "Soft Skills", "students": "120+ Students", "highlight": "Delicate ability coaching, effective communication & interview etiquette."},
    {"sheet": 8, "r": 1, "c": 1, "id": "ghss-morattupalayam", "name": "GHSS Morattupalayam", "location": "Morattupalayam, Uthukuli", "cat": "Career Guidance", "students": "130+ Students", "highlight": "Technical degree pathways, TNEA choice filling and collegiate scholarship orientation."},
    {"sheet": 8, "r": 1, "c": 2, "id": "ghss-v-kallipalayam", "name": "GHSS V.Kallipalayam", "location": "V.Kallipalayam, Palladam", "cat": "Higher Education", "students": "140+ Students", "highlight": "Science & commerce degree guidance with complete college cut-off analysis."},
    {"sheet": 8, "r": 2, "c": 0, "id": "ghss-ganapathipalayam", "name": "GHSS Ganapathipalayam", "location": "Ganapathipalayam, Tiruppur", "cat": "Govt School Quota", "students": "145+ Students", "highlight": "Zero documentation fee verification & full scholarship counselling for Class 12."}
]

print(f"Total schools defined: {len(schools_data)}")

# Crop cards & photos for each school
output_items = []

# Load pages into memory cache
pages = {}
for i in range(1, 9):
    p_path = os.path.join(OUT_BASE, f"sheet_page_{i}.jpg")
    pages[i] = cv2.imread(p_path)
    print(f"Loaded sheet {i}, shape: {pages[i].shape}")

for item in schools_data:
    sheet_num = item["sheet"]
    r = item["r"]
    c = item["c"]
    school_id = item["id"]
    
    page = pages[sheet_num]
    y1, y2 = rows[r]
    x1, x2 = cols[c]
    
    # 1. Card crop
    card = page[y1:y2, x1:x2]
    card_filename = f"{school_id}_card.jpg"
    card_path = os.path.join(CARDS_DIR, card_filename)
    cv2.imwrite(card_path, card, [cv2.IMWRITE_JPEG_QUALITY, 92])
    
    # 2. Photo crop
    photo = card[PHOTO_Y1:PHOTO_Y2, PHOTO_X1:PHOTO_X2]
    photo_filename = f"{school_id}_photo.jpg"
    photo_path = os.path.join(CARDS_DIR, photo_filename)
    cv2.imwrite(photo_path, photo, [cv2.IMWRITE_JPEG_QUALITY, 92])
    
    item_record = {
        "id": school_id,
        "name": item["name"],
        "location": item["location"],
        "district": "Tiruppur",
        "sheet": sheet_num,
        "photoUrl": f"/images/gallery/tiruppur/cards/{photo_filename}",
        "cardUrl": f"/images/gallery/tiruppur/cards/{card_filename}",
        "category": item["cat"],
        "date": "Academic Year 2026–2027",
        "studentsCount": item["students"],
        "highlight": item["highlight"]
    }
    output_items.append(item_record)

print(f"Successfully processed {len(output_items)} school cards and photos!")

# Write metadata json
with open(os.path.join(OUT_BASE, "tiruppur_gallery.json"), "w") as f:
    json.dump(output_items, f, indent=2)

print("Saved metadata to tiruppur_gallery.json")
