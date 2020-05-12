const PROJECTS = [
  {
    'title': 'Cy-Ranch App',
    'tagline': 'An app I created for Cy-Ranch High School.',
    'language': 'HTML CSS JS',
    'tags': 'android apple school ionic cyranch cfisd school-app',
    'github': 'https://github.com/sshh12/CyRanch-App',
    'article': 'https://cyranchnews.com/4407/archives/school-app/',
    'start': 'May 25, 2016',
    'coolness': 8,
    'desc': [
      'Created an Ionic app for IOS and Android for CyRanch HS',
      'Used Admob to monetize the app and profit'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/58373859-68ff5b00-7efa-11e9-9fd9-8bbf82846be7.png',
    'domain': 'Mobile'
  },
  {
    'title': 'CFISD App',
    'tagline': 'An app I created for Cypress Fairbanks ISD.',
    'tags': 'android apple school ionic cyranch cfisd school-app',
    'language': 'HTML CSS JS',
    'github': 'https://github.com/sshh12/CFISD-App',
    'article': 'https://cyranchnews.com/4407/archives/school-app/',
    'start': 'May 14, 2018',
    'coolness': 5,
    'desc': [
      'Created an app for IOS and Android for all of CFISD',
      'Used Admob to monetize the app and profit'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/58373775-36a12e00-7ef9-11e9-99e1-28d9f1f79d33.png',
    'domain': 'Mobile'
  },
  {
    'title': 'CFISD API',
    'tagline': 'The Unofficial CFISD Student API.',
    'language': 'Python',
    'tags': 'rest-api flask requests lxml cyranch',
    'url': 'http://cfisdapi.sshh.io',
    'github': 'https://github.com/sshh12/CFISD-API',
    'start': 'Jan 20, 2017',
    'coolness': 6,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58511102-c6e0ac80-815f-11e9-829a-c5a050de73a9.png',
    'domain': 'Backend'
  },
  {
    'title': 'UT Finder',
    'tagline': 'An app for the University of Texas at Austin.',
    'language': 'HTML CSS JS',
    'tags': 'android apple school ionic UT school-app',
    'github': 'https://github.com/sshh12/UT-Finder',
    'article': 'https://www.dailytexanonline.com/2018/10/16/student-developed-ut-app-fills-void-left-by-official-university-app-redesign',
    'start': 'Sep 10, 2018',
    'coolness': 8,
    'desc': [
      'Created an IOS/Android app for UT Austin students',
      'Integrated course schedules, $ balances, and bus routes',
      'Featured in the Daily Texan'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/57817116-92bec200-7743-11e9-92c6-111aa96dc3f5.png',
    'domain': 'Mobile'
  },
  {
    'title': 'SSHH.IO',
    'tagline': 'This website.',
    'tags': 'website gulp html5',
    'language': 'HTML CSS JS',
    'url': 'https://sshh.io',
    'github': 'https://github.com/sshh12/SSHH.IO',
    'start': 'Jul 5, 2018',
    'coolness': 4,
    'thumb': 'https://user-images.githubusercontent.com/6625384/70382309-2d206600-191f-11ea-8543-b71a4f40f132.png',
    'domain': 'Frontend'
  },
  {
    'title': '"Shrivu Bot"',
    'tagline': 'A personalized discord bot.',
    'tags': 'discord discord-bot discord-js',
    'language': 'JS',
    'github': 'https://github.com/sshh12/SSHHIO-Discord-Bot',
    'start': 'Dec 30, 2017',
    'coolness': 4,
    'domain': 'Misc'
  },
  {
    'title': 'StockMarketML',
    'tagline': 'Predicting stocks with ML.',
    'tags': 'tensorflow keras ML stock-market stock-price-prediction',
    'language': 'Python Jupyter',
    'github': 'https://github.com/sshh12/StockMarketML',
    'start': 'Sep 16, 2017',
    'coolness': 8,
    'desc': [
      'Created several parsers to gather large amounts of headlines and stock data',
      'Developed several models for predicting price movements based on headlines and tick data overtime',
      'Used a bootstrap based web app to view predictions'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/40280636-7ac6908a-5c1c-11e8-9d96-ededc88cb233.png',
    'domain': 'AI'
  },
  {
    'title': 'Splitscreen Player',
    'tagline': 'A synchronous multi-video viewer built on firebase.',
    'tags': 'firebase bootstrap esports',
    'language': 'HTML CSS JS',
    'github': 'https://github.com/sshh12/Splitscreen-Player',
    'start': 'Feb 5, 2017',
    'coolness': 7,
    'desc': [
      'Developed web app to play and control several videos in sync',
      'Used Firebase to allow multiple users to control and stream the videos simultaneously'
    ],
    'thumb': 'https://cloud.githubusercontent.com/assets/6625384/22629722/6aaf0f06-ebb1-11e6-993f-ef71bfa0e9c9.jpg',
    'domain': 'Full Stack'
  },
  {
    'title': 'SchoolCode',
    'tagline': 'A collection of scripts/algorithms that I wrote for/were inspired by school projects.',
    'tags': 'school computer-science-algorithms ap-computer-science cyranch',
    'language': 'JS Java Python',
    'github': 'https://github.com/sshh12/SchoolCode',
    'start': 'Jun 5, 2017',
    'coolness': 7,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58511033-9d278580-815f-11e9-8ef6-7888b451b1d9.gif',
    'domain': 'Misc'
  },
  {
    'title': 'JavaIsWeird',
    'tagline': 'A helpful collection of java stuff.',
    'tags': 'java guide handbook weird',
    'language': 'Java',
    'github': 'https://github.com/sshh12/JavaIsWeird',
    'start': 'Sep 1, 2017',
    'coolness': 5,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58510930-68b3c980-815f-11e9-86e2-c476c0199075.gif',
    'domain': 'Misc'
  },
  {
    'title': 'Build-A-Bill',
    'tagline': 'Creating Legislation with AI',
    'tags': 'ML keras lstm char-rnn govtrack',
    'language': 'Python Jupyter',
    'github': 'https://github.com/sshh12/Build-A-Bill',
    'start': 'Jan 5, 2018',
    'coolness': 6,
    'desc': [
      'Scraped and processed years of US Congressional legislation to create a dataset',
      'Trained a character-level LSTM and finetuned GPT-2 (117M) to write fake bills'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/58374269-3c027680-7f01-11e9-9147-4424b489e0fa.png',
    'domain': 'AI'
  },
  {
    'title': 'OverwatchML',
    'tagline': 'Overwatch + AI',
    'tags': 'overwatch ML ai keras',
    'language': 'Python Jupyter',
    'github': 'https://github.com/sshh12/OverwatchML',
    'start': 'Aug 25, 2017',
    'coolness': 7,
    'desc': [
      'Created a web scraper to gather usernames as test data',
      'Analyzed and processed user stats to build a predictive model',
      'Built a webapp to allow users to predict their online rank'
    ],
    'domain': 'AI',
    'thumb': 'https://user-images.githubusercontent.com/6625384/70382355-26462300-1920-11ea-8ed8-1b9681ef0758.png'
  },
  {
    'title': 'Webcam Anomaly Detection',
    'tagline': 'An FTP server that logs anomalous motion from a camera stream.',
    'tags': 'ML ftp webcam pyftpdlib keras anomaly-detection skimage',
    'language': 'Python',
    'github': 'https://github.com/sshh12/Webcam-Anomaly-Detection',
    'start': 'Jun 4, 2017',
    'coolness': 6,
    'desc': [
      'Created a specialized FTP server to process images on upload',
      'Used Skimage and Keras to detect anomalies in the photo stream'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/26891644-64de5080-4b7b-11e7-8960-57ce75c99e28.jpg',
    'domain': 'AI'
  },
  {
    'title': 'Genetic Connect4',
    'tagline': 'Using evolution to evolve a minimax connect4 AI.',
    'tags': 'connect-four minimax evolution-simulation genetic-algorithms',
    'language': 'Python',
    'github': 'https://github.com/sshh12/Genetic-Connect4',
    'start': 'Jun 22, 2017',
    'coolness': 5,
    'desc': [
      'Added several coefficients to the minimax agent\'s scoring heuristic',
      'Used these coefficients as DNA with win rate as a fitness function'
    ],
    'domain': 'AI'
  },
  {
    'title': 'Students Visualization',
    'tagline': 'A Visualization of the Cy-Ranch Student Body',
    'tags': 'sklearn t-sne p5js cyranch cfisd matplotlib 3D',
    'language': 'HTML CSS JS Python',
    'github': 'https://github.com/sshh12/Students-Visualization',
    'start': 'Apr 28, 2017',
    'coolness': 7,
    'desc': [
      'With the data collected from the CyRanch/CFISD Apps, every users\' grades were turned into a 7D vector based on their average grade in 7 fields: Science, Math, English, (Non-English) Language, Arts, Sports, and Social Studies. Using a dimensionality reduction algorithm, t-SNE, the data was used to create clusters of students based on their academic performance. While these 3D groupings are purely abstract, they serve as an interesting way to visualize students and see possible patterns.',
      'Additional visualizations were contructed to explore GPA, classes, and demographics.'
    ],
    'thumb': 'https://cloud.githubusercontent.com/assets/6625384/25551412/3e642c36-2c4a-11e7-84ca-030f6d723ba6.gif',
    'domain': 'Data'
  },
  {
    'title': 'RanchCoin',
    'tagline': 'A "Cryptocurrency" for EconFair',
    'tags': 'firebase cyranch digital-currency crypto',
    'language': 'HTML CSS JS',
    'url': 'https://ranchcoin.firebaseapp.com/',
    'github': 'https://github.com/sshh12/RanchCoin',
    'start': 'Apr 10, 2018',
    'coolness': 5,
    'desc': [
      'Created a fully functioning currency/wallet for Economics Fair.'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/39553689-800be568-4e34-11e8-86f5-7d32e4927666.png',
    'domain': 'Full Stack'
  },
  {
    'title': 'FaceTweet',
    'tagline': 'English Social Media Site Satire Project',
    'tags': 'firebase english satire friendly-pix',
    'language': 'HTML CSS JS',
    'url': 'https://facetweet-71a89.firebaseapp.com/',
    'github': 'https://github.com/sshh12/FaceTweet',
    'start': 'Mar 7, 2018',
    'coolness': 4,
    'desc': [
      'Adapted Firebase\'s social media demo site to create an interactive satire'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/37736121-0c3a7f82-2d1e-11e8-8f2f-23527d778b83.png',
    'domain': 'Frontend'
  },
  {
    'title': 'Rummy',
    'tagline': 'A full-stack app for playing multiplayer Rummy.',
    'tags': 'express-js fullstack js rummy',
    'language': 'HTML CSS JS',
    'github': 'https://github.com/sshh12/Rummy',
    'start': 'Jan 11, 2018',
    'coolness': 5,
    'desc': [
      'A web-based online multiplayer version of the card game Rummy'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/35307951-e63e8362-006a-11e8-97a5-18361f151072.gif',
    'domain': 'Full Stack'
  },
  {
    'title': 'Ballz Bot',
    'tagline': 'A bot for Ballz.',
    'tags': 'game python bot pillow ballz pytesser',
    'language': 'Python',
    'github': 'https://github.com/sshh12/Ballz-Bot',
    'start': 'Apr 9, 2017',
    'coolness': 6,
    'desc': [
      'Combined ADB and pytesser to parse the devices screen when in the game',
      'Constructed a physics engine to simulate playing the game with different moves',
      'Used the android swipe API to execute the best move'
    ],
    'thumb': 'https://cloud.githubusercontent.com/assets/6625384/25557899/f4b1f0fe-2ce0-11e7-9245-463100049ea3.gif',
    'domain': 'AI'
  },
  {
    'title': 'Recording Bot',
    'tagline': 'A bot built to record and transcribe audio fragments from Discord.',
    'tags': 'discord bot speech-recognition transcription',
    'language': 'JS Python',
    'github': 'https://github.com/sshh12/Recording-Bot',
    'start': 'May 23, 2017',
    'coolness': 6,
    'domain': 'Misc'
  },
  {
    'title': 'PwnSSHH',
    'tagline': 'Python wrapper for the MR3040.',
    'tags': 'tp-link pineapple mr3040 minipwner',
    'language': 'Python',
    'github': 'https://github.com/sshh12/PwnSSHH',
    'start': 'Jul 14, 2017',
    'coolness': 4,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58510859-373afe00-815f-11e9-8a59-50184145e961.png',
    'domain': 'Hacking'
  },
  {
    'title': 'StealthML',
    'tagline': 'Using image segmentation and in-painting to tinker with images.',
    'tags': 'ML computer-vision segmentation',
    'language': 'Python',
    'github': 'https://github.com/sshh12/StealthML',
    'start': 'Dec 9, 2018',
    'coolness': 8,
    'desc': [
      'Combined image segmentation and inpainting to create a invisibility cloak like effect',
      'Tweaked the model to run at near real time from a webcam stream'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/51450883-87f9a080-1d00-11e9-98d6-4f5983bdb5b8.gif',
    'domain': 'AI'
  },
  {
    'title': 'Money Classifier',
    'tagline': 'Charting and classifying expenses.',
    'tags': 'ML chase textblob',
    'language': 'Python',
    'github': 'https://gist.github.com/sshh12/d362dba3f72498cd9604de63a659b870',
    'start': 'Jun 20, 2018',
    'coolness': 2,
    'tiny': true,
    'domain': 'Data'
  },
  {
    'title': 'CS UIL Data',
    'tagline': 'Analyzing Computer Science UIL data',
    'tags': 'pandas UIL',
    'language': 'Python Jupyter',
    'github': 'https://gist.github.com/sshh12/3bdb4daf63fb1bc00500c27f0a731fe8',
    'start': 'Mar 21, 2018',
    'coolness': 5,
    'tiny': true,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58374409-53426380-7f03-11e9-8b6b-f622f648c1ab.png',
    'domain': 'Data'
  },
  {
    'title': 'Caterpillar Code',
    'tagline': 'func()()',
    'tags': 'random',
    'language': 'Python',
    'github': 'https://gist.github.com/sshh12/63cb074767d1f7032c3379652772b51e',
    'start': 'Dec 16, 2017',
    'coolness': 1,
    'tiny': true,
    'domain': 'Misc'
  },
  {
    'title': 'DPS Checker',
    'tagline': 'Interfacing with a DPS kiosk',
    'tags': 'DPS crawler',
    'language': 'Python',
    'github': 'https://gist.github.com/sshh12/fc3867a218ed41ca6e4cd5e634b666f6',
    'start': 'Aug 1, 2017',
    'coolness': 6,
    'tiny': true,
    'domain': 'Misc'
  },
  {
    'title': 'Probability Test',
    'tagline': 'Testing the probability of an even distribution of n numbers over k values.',
    'tags': 'math probability',
    'language': 'Python',
    'github': 'https://gist.github.com/sshh12/6186968785dd6f7b4c9a3b34aee9ac76',
    'start': 'Nov 5, 2017',
    'coolness': 1,
    'tiny': true,
    'domain': 'Misc'
  },
  {
    'title': 'Titanic',
    'tagline': 'Analyzing the Titanic',
    'tags': 'kaggle ML',
    'language': 'Python Jupyter',
    'github': 'https://github.com/sshh12/MLCode/blob/master/competitions/titanic/Titanic.ipynb',
    'kaggle': 'https://www.kaggle.com/c/titanic',
    'start': 'Mar 20, 2018',
    'coolness': 4,
    'tiny': true,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58510286-00181d00-815e-11e9-910c-198e1f4b6e0c.png',
    'domain': 'Data'
  },
  {
    'title': 'Frequency Visualizer',
    'tagline': 'An interactive sound visualizer',
    'tags': 'sound interactive p5js',
    'language': 'HTML CSS JS',
    'url': '/apps/freqvis/index.html',
    'start': 'May 8, 2017',
    'coolness': 5,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58374383-ddd69300-7f02-11e9-9a55-377bad352976.gif',
    'domain': 'Frontend'
  },
  {
    'title': 'Online Physics Utilities',
    'tagline': 'A small collection of mobile web tools.',
    'tags': 'tools p5js mobile',
    'language': 'HTML CSS JS',
    'url': '/apps/toolkit/gyro.html',
    'start': 'Apr 22, 2017',
    'coolness': 4,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58510782-17a3d580-815f-11e9-843b-e941fc1686fd.gif',
    'domain': 'Frontend'
  },
  {
    'title': 'Hangman Solver',
    'tagline': 'A bruteforcer for hangman.',
    'tags': 'tools bootstrap hangman',
    'language': 'HTML CSS JS',
    'url': '/apps/hangman/index.html',
    'start': 'Mar 14, 2017',
    'coolness': 4,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58510682-e7f4cd80-815e-11e9-83d0-bedd8894c753.gif',
    'domain': 'Frontend'
  },
  {
    'title': 'Leet Typer',
    'tagline': 'Codin\' like a pro',
    'tags': 'typing leet',
    'language': 'HTML CSS JS',
    'url': '/apps/leettyper/index.html?https://raw.githubusercontent.com/sshh12/Webcam-Anomaly-Detection/master/generate_anomaly_model.py',
    'start': 'Apr 10, 2017',
    'coolness': 4,
    'tiny': true,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58510571-a2d09b80-815e-11e9-9c6d-cf1f43726feb.gif',
    'domain': 'Frontend'
  },
  {
    'title': 'Trump Physics',
    'tagline': 'An AP Physics project',
    'tags': 'physics video-analysis school',
    'language': 'HTML',
    'url': '/apps/trumpphysics/index.html',
    'start': 'Nov 15, 2017',
    'coolness': 2,
    'tiny': true,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58509900-43be5700-815d-11e9-9d27-26726a7b8323.png',
    'domain': 'Frontend'
  },
  {
    'title': 'Case Viewer',
    'tagline': 'A parser to increase the efficiency of debate.',
    'tags': 'parser debate',
    'language': 'HTML CSS JS',
    'url': '/apps/case-viewer/view.html',
    'start': 'Sep 30, 2017',
    'coolness': 6,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58374374-a36cf600-7f02-11e9-9f7c-6ce7af12ef4a.gif',
    'domain': 'Frontend'
  },
  {
    'title': 'L\'Homme Qui Plantait Des Arbres',
    'tagline': 'An interactive timeline for an AP French Book.',
    'tags': 'french interactive maps school',
    'language': 'HTML CSS JS',
    'url': '/apps/lehomme/index.html',
    'start': 'Nov 20, 2015',
    'coolness': 4,
    'domain': 'Frontend'
  },
  {
    'title': 'Genocide Project',
    'tagline': 'World History AP Genocide Project',
    'tags': 'WHAP history school',
    'language': 'HTML',
    'url': '/apps/genocide/index.html',
    'start': 'April 10, 2016',
    'coolness': 3,
    'tiny': true,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58510498-7b79ce80-815e-11e9-8755-d3814aee6ddb.png',
    'domain': 'Frontend'
  },
  {
    'title': 'Le Mont Saint Michel',
    'tagline': 'AP French castle project',
    'tags': 'french 3D school',
    'language': 'HTML',
    'url': '/apps/castle/index.html',
    'start': 'Feb 15, 2016',
    'coolness': 4,
    'tiny': true,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58510397-47061280-815e-11e9-87dd-2a96050875f3.png',
    'domain': 'Frontend'
  },
  {
    'title': 'Revolution Meter',
    'tagline': 'US History tension visualized with cats.',
    'tags': 'history school',
    'language': 'HTML',
    'url': '/apps/revolution/index.html',
    'start': 'Nov 2, 2016',
    'coolness': 4,
    'tiny': true,
    'domain': 'Frontend'
  },
  {
    'title': 'infotrac.galegroup.com',
    'tagline': 'Blind SQL Injection',
    'tags': 'hack sql',
    'language': 'SQL',
    'start': 'Jan 20, 2017',
    'coolness': 5,
    'hack': true,
    'domain': 'Hacking'
  },
  {
    'title': 'texasmusicforms.com',
    'tagline': 'Error Based SQL Injection',
    'tags': 'hack sql',
    'language': 'SQL',
    'start': 'Oct 10, 2017',
    'coolness': 4,
    'hack': true,
    'domain': 'Hacking'
  },
  {
    'title': 'home-access.cfisd.net',
    'tagline': 'Integer Overflow (MS15-034)',
    'tags': 'hack overflow',
    'language': 'Python',
    'url': 'https://gist.github.com/sshh12/f468394dfa51f4cee2721e3e057740b9',
    'start': 'Aug 15, 2016',
    'coolness': 8,
    'hack': true,
    'domain': 'Hacking'
  },
  {
    'title': 'practiceit.cs.washington.edu',
    'tagline': 'Reflected XSS',
    'tags': 'hack overflow',
    'language': 'JS',
    'start': 'Mar 8, 2016',
    'coolness': 5,
    'hack': true,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58510355-2ccc3480-815e-11e9-85a1-eb980c65388b.png',
    'domain': 'Hacking'
  },
  {
    'title': 'Tradinhood',
    'tagline': 'Programmatically trading stocks and crypto with Robinhood.',
    'tags': 'investing robinhood crypto stocks',
    'language': 'Python',
    'github': 'https://github.com/sshh12/Tradinhood',
    'start': 'Jul 27, 2018',
    'coolness': 7,
    'desc': [
      'Used Chrome DevTools to reverse engineer Robinhood\'s REST API',
      'Developed a wrapper for the API and well as several other trading sites',
      'Designed a trading interface to seamlessly go from backtests to trading real assets'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/58509787-fb069e00-815c-11e9-89eb-808f1861ce65.png',
    'domain': 'Misc'
  },
  {
    'title': 'pymeritrade',
    'tagline': 'A python interface for using the TD Ameritrade API.',
    'tags': 'investing stocks',
    'language': 'Python',
    'github': 'https://github.com/sshh12/pymeritrade',
    'start': 'Apr 25, 2020',
    'coolness': 7,
    'thumb': 'https://user-images.githubusercontent.com/6625384/81488166-f1216200-922a-11ea-99b9-f2fff0fc9ded.png',
    'domain': 'Misc'
  },
  {
    'title': 'Campus Maps',
    'tagline': 'Mapping places and events around campuses.',
    'language': 'HTML CSS JS',
    'tags': 'react firebase map hackathon',
    'github': 'https://github.com/sshh12/Campus-Maps',
    'start': 'Sep 14, 2018',
    'coolness': 5,
    'team': 'HackRice \'18',
    'url': 'https://devpost.com/software/campus-maps-k6y2pd',
    'tiny': true,
    'desc': [
      'Our product is a map that encodes visual, spatial, temporal, and other descriptive data about events happening around in the local environment. It seeks to streamline the process of obtaining information for the general public, filling a void that is not satsified by current technology such as Facebook, Google Maps, and other services that provide data about the world around you. It is meant to be a gateway to experiencing a higher quality level of campus life.'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/45606639-5e580200-ba0c-11e8-82a5-48ce68d4bc53.png',
    'domain': 'Full Stack'
  },
  {
    'title': 'Videoscopic',
    'tagline': 'Uncovering political insights one video at a time.',
    'language': 'Python HTML',
    'tags': 'chrome ML CV NLP',
    'github': 'https://github.com/sshh12/Videoscopic',
    'start': 'Apr 21, 2019',
    'coolness': 7,
    'team': 'HackTogether \'19',
    'url': 'https://devpost.com/software/videoscopic',
    'tiny': true,
    'desc': [
      'Using the user\'s screen to provide realtime insights with facial recognition',
      'The video\'s description and tags with NLP entity recognition to provide related topics',
      'The channel is used to determine the validity and accuracy of the video'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/56474300-c278f380-643d-11e9-8799-892fd4ce84d3.png',
    'domain': 'AI'
  },
  {
    'title': 'UAVA Image Rec',
    'tagline': 'Combining image recognition with unmanned aerial vehicles.',
    'language': 'Python',
    'tags': 'ML CV uav opencv tensorflow UT club target-finder uava',
    'github': 'https://github.com/sshh12/UAV-Image-Rec',
    'url': 'http://uavaustin.org',
    'article': 'https://github.com/sshh12/UAV-Image-Rec/blob/master/UAVA-2019.pdf',
    'start': 'Sep 20, 2018',
    'coolness': 7,
    'team': 'UAV Austin',
    'thumb': 'https://user-images.githubusercontent.com/6625384/58374531-6fdf9b00-7f05-11e9-9d2c-e51c024209d5.jpg',
    'domain': 'AI'
  },
  {
    'title': 'Seeker',
    'tagline': 'Uncooperative satellite pose estimation.',
    'language': 'Python',
    'tags': 'ML CV tensorflow',
    'github': 'https://github.com/autognc',
    'url': 'https://sites.utexas.edu/tsl/',
    'start': 'March 9, 2020',
    'coolness': 7,
    'team': 'TSL',
    'thumb': 'https://user-images.githubusercontent.com/6625384/81488129-7a846480-922a-11ea-94bd-f202f2c08b9b.jpg',
    'domain': 'AI'
  },
  {
    'title': 'UText NLP Bot',
    'tagline': 'Helping students access university resources with Machine Comprehension.',
    'language': 'Python',
    'tags': 'ML NLP club dialog-flow',
    'start': 'Sep 24, 2018',
    'coolness': 7,
    'team': 'Texas Convergent',
    'github': 'https://github.com/sshh12/UText-NLP',
    'url': 'http://www.txconvergent.org/',
    'thumb': 'https://user-images.githubusercontent.com/6625384/51092865-78131700-176a-11e9-8d05-214ace83a48e.png',
    'domain': 'AI'
  },
  {
    'title': 'Halite III Bot',
    'tagline': 'A bot for competing in Two Sigma\'s AI tournament.',
    'language': 'Python',
    'tags': 'ML RL bot competition',
    'start': 'Nov 3, 2018',
    'coolness': 6,
    'github': 'https://github.com/sshh12/Halite-III-AI-Bot',
    'url': 'https://halite.io/',
    'desc': [
      'This bot switched from the idea of having a separate (shared) model for every unit to a single model that predicted a volume of actions (an action vector was predicted for every pixel). The bot was trained with a supervised dataset collected by an \'expert\' bot playing against the archive.'
    ],
    'thumb': 'https://i.imgur.com/ZXj1nzK.jpg',
    'domain': 'AI'
  },
  {
    'title': 'OdoNet',
    'tagline': 'A framework for a network of advanced monitoring devices.',
    'language': 'HTML CSS JS Python',
    'tags': 'raspberry-pi wifi security object-recognition',
    'github': 'https://github.com/sshh12/OdoNet',
    'start': 'Jan 1, 2019',
    'coolness': 7,
    'desc': [
      'Developed a framework for IOT devices to chain WiFi connections',
      'Used object detection (and OpenCV lib) to capture and report events through the network',
      'Built an admin dashboard for controlling the devices'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/50607063-f1228c80-0e95-11e9-9b46-97053c982587.png',
    'domain': 'Misc'
  },
  {
    'title': 'My Mentor Network',
    'tagline': 'A social platform to connect students to professionals.',
    'language': 'HTML CSS JS',
    'tags': 'k12 school express mongodb',
    'url': 'https://my-mentor-network.herokuapp.com',
    'team': 'My Mentor Network',
    'start': 'Jan 20, 2019',
    'coolness': 5,
    'desc': [
      'Built a fullstack application which enables professionals to better answer student questions.',
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/58507511-8c731180-8157-11e9-8938-f69b3f43ecb5.gif',
    'domain': 'Full Stack'
  },
  {
    'title': 'Squarecap SWE Intern',
    'tagline': 'Using technology to empower teachers and students.',
    'language': 'Python JS',
    'tags': 'college edtech school electron webscraping react react-native pyramid cassandra',
    'team': 'Squarecap',
    'url': 'https://info.squarecap.com/',
    'start': 'Feb 11, 2019',
    'coolness': 6,
    'domain': 'Internship',
    'thumb': 'https://user-images.githubusercontent.com/6625384/70382343-d8c9b600-191f-11ea-8d53-d8ca06b7273e.png'
  },
  {
    'title': 'CSL Capital Management SWE Intern',
    'tagline': 'Enabling great innovators to build lasting companies.',
    'language': 'JS',
    'tags': 'react express pwa dashboard',
    'team': 'CSL',
    'url': 'http://www.cslenergy.com/',
    'start': 'Oct 1, 2019',
    'coolness': 6,
    'domain': 'Internship',
    'thumb': 'https://user-images.githubusercontent.com/6625384/70382336-a029dc80-191f-11ea-962f-b58a8ac69d42.png'
  },
  {
    'title': 'AI Global SWE Intern',
    'tagline': 'Accelerating practical and responsible design, development, and use of Artificial Intelligence.',
    'language': 'Python JS',
    'tags': 'ML AI ethics',
    'team': 'AI Global',
    'url': 'https://ai-global.org/',
    'start': 'Feb 1, 2020',
    'coolness': 7,
    'domain': 'Internship',
    'thumb': 'https://user-images.githubusercontent.com/6625384/77083131-fef4fc80-69ca-11ea-84b1-8e5aa63a9d8e.jpg'
  },
  {
    'title': 'Stripe SWE Intern',
    'tagline': 'Online payment processing for internet businesses.',
    'language': 'Unk',
    'tags': '',
    'team': 'Stripe',
    'url': 'https://stripe.com/',
    'start': 'May 25, 2020',
    'coolness': 7,
    'domain': 'Internship',
    'thumb': 'https://user-images.githubusercontent.com/6625384/81705673-ea663b00-9434-11ea-821d-119c241dff9a.png'
  },
  {
    'title': 'Crypto Marketplace Workshop',
    'tagline': 'Learning JS backend with fake crypto.',
    'language': 'JS',
    'tags': 'college express mongodb mongoose workshop',
    'team': 'Texas Convergent',
    'github': 'https://github.com/sshh12/Crypto-Marketplace-Workshop',
    'start': 'Mar 23, 2019',
    'coolness': 4,
    'desc': [
      'A super simple project to introduce backend web dev with Express and MongoDB.'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/58508518-d2c97000-8159-11e9-9438-b23bf955df75.gif',
    'domain': 'Full Stack'
  },
  {
    'title': 'Ti Scripts',
    'tagline': 'Misc utilities/scripts for Ti calculators.',
    'language': 'C',
    'github': 'https://github.com/sshh12/Ti-Scripts',
    'tags': 'college ti tigcc',
    'start': 'Mar 20, 2019',
    'tiny': true,
    'coolness': 4,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58509683-c09d0100-815c-11e9-9506-2f8851399712.gif',
    'domain': 'Misc'
  },
  {
    'title': 'InvestorCraft',
    'tagline': 'Invest in stocks through Minecraft.',
    'language': 'Java',
    'github': 'https://github.com/sshh12/InvestorCraft',
    'tags': 'minecraft plugin',
    'start': 'May 22, 2019',
    'tiny': true,
    'coolness': 5,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58374471-45d9a900-7f04-11e9-82ad-e2e7d6b7161b.gif',
    'domain': 'Misc'
  },
  {
    'title': 'Conv VAD',
    'tagline': 'A packaged convolutional voice activity detector for noisy environments.',
    'language': 'Python',
    'github': 'https://github.com/sshh12/Conv-VAD',
    'tags': 'ML CNN keras vad voice-activity-detection',
    'start': 'May 24, 2019',
    'coolness': 6,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58511882-5aff4380-8161-11e9-9903-2f0a91afee99.gif',
    'domain': 'AI'
  },
  {
    'title': 'Voice Vector',
    'tagline': 'A one-shot siamese approach to generating voice embeddings.',
    'language': 'Python',
    'github': 'https://github.com/sshh12/Voice-Vector',
    'tags': 'ML CNN keras siamese',
    'start': 'May 31, 2019',
    'coolness': 6,
    'thumb': 'https://user-images.githubusercontent.com/6625384/58922114-2fe79780-86ff-11e9-9b45-33ee1c7a342d.png',
    'domain': 'AI'
  },
  {
    'title': 'LibKinect2',
    'tagline': 'A Python API for interfacing with the Kinect2.',
    'language': 'C++ Python',
    'github': 'https://github.com/sshh12/LibKinect2',
    'tags': 'CPython kinect2',
    'start': 'June 8, 2019',
    'coolness': 6,
    'thumb': 'https://user-images.githubusercontent.com/6625384/59576903-088db480-9087-11e9-96f6-251240d25f0c.gif',
    'domain': 'Misc'
  },
  {
    'title': 'Financial News Indexing',
    'tagline': 'A suite of market/financial news webscrapers.',
    'language': 'Python',
    'tags': 'stocks bitcoin crypto elasticsearch',
    'start': 'June 25, 2019',
    'coolness': 5,
    'thumb': 'https://user-images.githubusercontent.com/6625384/61174301-d5462480-a563-11e9-98a3-27f388e20d63.png',
    'domain': 'Data',
    'github': 'https://github.com/sshh12/Financial-News-Indexing'
  },
  {
    'title': 'Convergent Portal',
    'tagline': 'A site to frictionlessly manage members, teams, and projects with Slack and GitHub integrations.',
    'language': 'JS',
    'team': 'Texas Convergent',
    'tags': 'college github slack portal react express',
    'start': 'July 13, 2019',
    'coolness': 4,
    'private': true,
    'thumb': 'https://user-images.githubusercontent.com/6625384/62168424-2b98be80-b2eb-11e9-832e-a9ebc946bafb.png',
    'domain': 'Full Stack'
  },
  {
    'title': 'Shridux',
    'tagline': 'A superior (mini) React global state management library.',
    'language': 'JS',
    'tiny': true,
    'github': 'https://gist.github.com/sshh12/3cfa2cc404b5851b23360f1915547de6',
    'tags': 'react redux',
    'start': 'July 14, 2019',
    'coolness': 3,
    'thumb': 'https://user-images.githubusercontent.com/6625384/62169230-4bc97d00-b2ed-11e9-923e-1f5905667a14.png',
    'domain': 'Frontend'
  },
  {
    'title': 'Wiress',
    'tagline': 'Dailup internet for mobile phones.',
    'language': 'Java',
    'tags': 'spark android hackathon',
    'github': 'https://github.com/sshh12/Wiress',
    'start': 'Sep 6, 2019',
    'coolness': 6,
    'team': 'PennApps \'19',
    'tiny': true,
    'desc': [
      'Wiress allows users to use the internet through a phone call (kind of like dial up or reversed VoIP).',
      '[Phone] <---callaudio---> [Twilio] <---websockets/hooks---> [Wiress Servers] <---http---> [Internet]'
    ],
    'thumb': 'https://user-images.githubusercontent.com/6625384/64572938-f68e7b80-d32e-11e9-94c9-a4c973b0c0bd.png',
    'domain': 'Misc'
  },
  {
    'title': 'Inverse Style GAN',
    'tagline': 'Looking up a generative latent vectors from reference images.',
    'language': 'Python',
    'tags': 'Tensorflow ML',
    'github': 'https://github.com/sshh12/Inverse-Style-GAN',
    'start': 'Sep 14, 2019',
    'coolness': 6,
    'thumb': 'https://user-images.githubusercontent.com/6625384/64915614-b82efd00-d730-11e9-92e4-f3a6de1a5575.png',
    'domain': 'AI'
  },
  {
    'title': 'Personal Home Assistant',
    'tagline': 'Custom Home Assistant plugins for my apartment.',
    'language': 'Python',
    'tags': 'ML CV OpenCV homeassistant',
    'github': 'https://github.com/sshh12/home-assistant-sshhio',
    'start': 'Sep 3, 2019',
    'coolness': 5,
    'thumb': 'https://user-images.githubusercontent.com/6625384/64915712-1ceb5700-d733-11e9-9404-64746db95882.jpg',
    'domain': 'Misc'
  },
  {
    'title': 'Aletheia',
    'tagline': 'An AI-powered epic translation comparison tool.',
    'language': 'Python',
    'tags': 'ML NLP CC303 React',
    'github': 'https://github.com/sshh12/Aletheia',
    'start': 'Nov 15, 2019',
    'coolness': 6,
    'thumb': 'https://user-images.githubusercontent.com/6625384/70382426-9ef9af00-1921-11ea-89c5-da79345e9587.png',
    'domain': 'AI'
  },
  {
    'title': 'PintOS',
    'tagline': 'An implementation of swap, syscalls, threads, and paging',
    'language': 'C',
    'tags': 'CS439 OperatingSystems',
    'private': true,
    'start': 'Sep 18, 2019',
    'coolness': 4,
    'team': 'CS439',
    'thumb': 'https://user-images.githubusercontent.com/6625384/77081923-5abe8600-69c9-11ea-8ce8-039211da700c.png',
    'domain': 'Systems'
  },
  {
    'title': 'CV Utils',
    'tagline': 'Simple scripts for quickly preprocessing image data.',
    'language': 'Python',
    'tags': 'CV',
    'tiny': true,
    'start': 'Jan 23, 2020',
    'coolness': 4,
    'thumb': 'https://user-images.githubusercontent.com/6625384/77082342-edf7bb80-69c9-11ea-8aa9-e047628bb485.png',
    'domain': 'Data',
    'github': 'https://gist.github.com/sshh12/b5e0709d7f8d1f50639fa6df35a846ed'
  },
  {
    'title': 'Convergent Kwickstart',
    'tagline': 'An app to help quickstart development environments.',
    'language': 'Python',
    'tags': 'utility',
    'team': 'Texas Convergent',
    'start': 'Jan 25, 2020',
    'github': 'https://github.com/TxConvergentAdmin/convergent-kwickstart',
    'coolness': 5,
    'thumb': 'https://user-images.githubusercontent.com/6625384/77083339-55fad180-69cb-11ea-99d1-558e3cdf08ee.png',
    'domain': 'Misc'
  },
  {
    'title': 'Remote',
    'tagline': 'A remote powerpoint clicker powered by Ngrok.',
    'tiny': true,
    'language': 'JS',
    'tags': 'utility',
    'team': 'Texas Convergent',
    'start': 'Apr 28, 2020',
    'github': 'https://github.com/TxConvergentAdmin/remote',
    'coolness': 5,
    'thumb': 'https://user-images.githubusercontent.com/6625384/81488243-e915f200-922b-11ea-852c-2cb4f5d6bcd2.png',
    'domain': 'Full Stack'
  },
  {
    'title': 'Expedition Gambit',
    'tagline': 'A general aircraft and status display for live protobuf-encoded telemetry.',
    'language': 'JS',
    'tags': 'uav react dashboard protobuf',
    'team': 'UAV Austin',
    'start': 'Feb 13, 2020',
    'github': 'https://github.com/uavaustin/expedition-gambit',
    'coolness': 5,
    'thumb': 'https://user-images.githubusercontent.com/6625384/81488355-4f4f4480-922d-11ea-986c-d58bfa5b13ac.png',
    'domain': 'Frontend'
  },
  {
    'title': 'Relevance-Adjusted Sentiment For Market News',
    'tagline': 'Using article and company embeddings to calculate adjusted media sentiment.',
    'language': 'Python',
    'article': 'https://github.com/sshh12/Relevance-Adjusted-Sentiment-For-Market-News/blob/master/paper/paper.pdf',
    'tags': 'ML NLP BERT',
    'start': 'Mar 5, 2020',
    'github': 'https://github.com/sshh12/Relevance-Adjusted-Sentiment-For-Market-News',
    'coolness': 8,
    'thumb': 'https://user-images.githubusercontent.com/6625384/81488295-a9033f00-922c-11ea-9d31-e6431d61f4d5.png',
    'domain': 'AI'
  }
];

export default PROJECTS;