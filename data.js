const experienceData = [
    {
        "position": "left",
        "title": "Head of Event Committee",
        "subtitle": "\"We Grow Together\" Gathering",
        "description": "Managed event planning and coordinated committee members to ensure the successful delivery and execution of the gathering."
    },
    {
        "position": "right",
        "title": "Treasurer",
        "subtitle": "New Student Admission Committee (KMK Bekasi)",
        "description": "Handled budget allocation, expense monitoring, and financial accountability for KMK New Student Admission activities in the Bekasi Region."
    }
];

const projectsData = [
    {
        "title": "KasaZa POS & Inventory",
        "image": "assets/Projects/KasaZa.png",
        "desc": "Developed a high-performance, single-page Point of Sale (POS) and inventory application using React, Vite, and Firebase. Features seamless real-time data synchronization across multiple devices. Designed a premium, fully responsive UI utilizing glassmorphism aesthetics and custom CSS variables. Engineered a robust multi-branch management system equipped with Role-Based Access Control (RBAC), integrated camera barcode scanning, and dynamic receipt generation.",
        "problem": "Manual recording of inventory and sales often led to data discrepancies, slow checkout processes, and inability to track multi-branch performance in real-time.",
        "github": "https://github.com/kumay112/KasaZa",
        "live": "https://pos-app-blue-mu.vercel.app/"
    },
    {
        "title": "WomenSpace Social Media",
        "image": "assets/Projects/WomenSpace.png",
        "desc": "Collaborated with a team to develop a full-stack social media platform for women using Flask, JavaScript, SQLite, and JWT authentication. Engineered secure user authentication, account verification workflows, and media upload capabilities. Implemented core social networking features including posts, replies, reposts, likes, trending content discovery, and an ML-based face verification integration.",
        "problem": "A lack of safe, dedicated social spaces for women, exacerbated by fake accounts and harassment on mainstream platforms.",
        "github": "https://github.com/kumay112/Women_Space",
        "live": "https://womenspace.app"
    },
    {
        "title": "Juan-Port.me Portfolio",
        "image": "assets/Projects/Port_me.png",
        "desc": "Developed a fully responsive front-end web portfolio styled as a futuristic space using HTML, CSS, JavaScript. Designed a modern dark-mode UI featuring neon glassmorphism aesthetics, custom DOM cursor tracking, and scroll-reveal animations. Integrated seamless email routing using the Fetch API.",
        "problem": "The need to stand out among thousands of fresh graduates by showcasing not just static information, but interactive coding skills and a deep understanding of UI/UX.",
        "github": "https://github.com/kumay112/Juan-Port.me",
        "live": "https://kumay112.github.io/Juan-Port.me/"
    },
    {
        "title": "Production Forecasting System",
        "image": "assets/Projects/Production_Forecasting_System.png",
        "desc": "A production forecasting and capacity planning project that uses polynomial regression to model production trends, evaluate forecasting accuracy, and predict future capacity requirements for warehouse expansion.",
        "problem": "Inaccurate production forecasting leading to inefficient capacity planning and lack of foresight for warehouse expansion.",
        "github": "https://github.com/kumay112/Production-Forecasting-System",
        "live": "https://colab.research.google.com/drive/15gqVRkqw_ETDCoYsAo5wbLB4vtCKOpxf?usp=sharing#scrollTo=ZiCYdWRKlUga"
    },
    {
        "title": "Builder Buddy",
        "image": "assets/Projects/Builder_Buddy.png",
        "desc": "A construction management system designed to improve project efficiency and transparency through features such as automated cost estimation, task management, worker attendance tracking, and real-time progress monitoring.",
        "problem": "Inefficiency and lack of transparency in construction management, making it difficult to estimate costs accurately, track worker attendance, and monitor real-time progress.",
        "github": "https://github.com/kumay112/Builder-Buddy",
        "live": "https://www.figma.com/proto/TiaMTjEZe0rg6MEtvKpIKv/BUILDER-BUDDY?node-id=1-3&p=f&t=puL6jC6U2CHf87bC-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3&show-proto-sidebar=1"
    },
    {
        "title": "Multi-Company Computer Network Design and Implementation",
        "image": "assets/Projects/Computer_Network_design.png",
        "desc": "The design, implementation, and testing of the multi-company network were successfully completed, meeting all specified requirements and ensuring reliable connectivity and network services across all companies.",
        "problem": "Isolated and unoptimized networks resulting in poor inter-company communication and a lack of reliable, secure, and unified network services.",
        "github": "https://github.com/kumay112/Multi-Company-Computer-Network-Design-and-Implementation",
        "live": ""
    },
    {
        "title": "Database Design Project",
        "image": "assets/Projects/Databases.png",
        "desc": "Performed database normalization from First Normal Form (1NF) to Third Normal Form (3NF) to improve data integrity, reduce redundancy, and optimize database structure.",
        "problem": "High data redundancy, poor data integrity, and unoptimized database structures that lead to slower queries and higher maintenance costs.",
        "github": "https://github.com/kumay112/Database-Design-Project",
        "live": ""
    },
    {
        "title": "Design and Simulation of a Simple RLC Rectifier Circuit for a Microhydro LED System",
        "image": "assets/Projects/RLC-Rectifier-Circuit.png",
        "desc": "Designed and simulated a simple RLC rectifier circuit for a microhydro LED system to optimize power conversion efficiency.",
        "problem": "Inefficient power conversion in microhydro systems causing energy loss and reducing the overall effectiveness of LED lighting applications.",
        "github": "https://github.com/kumay112/Design-and-Simulation-of-a-Simple-RLC-Rectifier-Circuit-for-a-Microhydro-LED-System",
        "live": "#"
    },
    {
        "title": "Clash Of Bang",
        "image": "assets/Projects/Clash-Of-Bang-Portal.png",
        "desc": "Developed and maintained the frontend of the Clash Portal using modern CSS and JavaScript, creating responsive user interfaces and implementing interactive features",
        "problem": "An outdated or non-responsive portal interface that provided a suboptimal user experience and lacked engaging interactive features.",
        "github": "https://github.com/kumay112/Clash-of-BaNG-Portal",
        "live": "https://clash-of-ba-ng-portal.vercel.app/"
    },
    {
        "title": "fake_news_pipeline",
        "image": "assets/Projects/Fake-News-Pipeline.png",
        "desc": "Built an automated machine learning pipeline for fake news detection, covering data preprocessing, feature extraction, model training, evaluation, comparison, and deployment using Python and Scikit-learn.",
        "problem": "The rapid spread of misinformation and the difficulty of manually verifying news credibility in a fast-paced digital information era.",
        "github": "https://github.com/kumay112/fake_news_pipeline",
        "live": ""
    },
    {
        "title": "Automatic plant waterer",
        "image": "assets/Projects/Penyiram_tanaman_otomatis.png",
        "desc": "Developed an Arduino-based automatic irrigation system that monitors soil moisture in real time and automatically controls a water pump to maintain optimal soil conditions.",
        "problem": "Plants withering due to inconsistent manual watering schedules and the inability to constantly monitor soil moisture levels in real-time.",
        "github": "https://github.com/kumay112/Automatic-plant-waterer",
        "live": "https://www.tinkercad.com/things/hkEqpLEPUzZ-penyiram-tanaman-otomatis/editel?returnTo=%2Fthings%2FhkEqpLEPUzZ-penyiram-tanaman-otomatis&sharecode=Hl1CUYRwGfPnS20ilz_ls0sqZ5buMJ_COgiTj32V-m0"
    }
];

const galleryData = [
    { "imageClass": "assets/Gallery/Wawancara_Tokoh_Agama.jpg", "caption": "Interviews with Religious Figures" },
    { "imageClass": "assets/Gallery/Membersihkan_Pantai.jpg", "caption": "Beach Cleaning" },
    { "imageClass": "assets/Gallery/Presentasi_dampak_konversi_lahan.jpg", "caption": "Presentation - Impact of Land Conversion" },
    { "imageClass": "assets/Gallery/Pengecatan_Alat_Bermain.jpeg", "caption": "Painting Kindergarten Play Equipment" },
    { "imageClass": "assets/Gallery/Sosialisasi_Sekolah.jpeg", "caption": "School Awareness - Hazards of Smoking" },
    { "imageClass": "assets/Gallery/Organization_Epo.jpeg", "caption": "Organization Expo - Student B30" },
    { "imageClass": "assets/Gallery/We_Grow_Together.jpg", "caption": "Gathering - We Grow Together" },
    { "imageClass": "assets/Gallery/Faith_that_Unites,_Love_that_Grows.jpeg", "caption": "Faith that Unites, Love that Grows" }
];
