
const projects = [
  {
    'title': 'Cy-Ranch App',
    'tagline': 'An app I created for Cy-Ranch High School.',
    'language': 'JS HTML CSS',
    'tags': 'android apple school ionic cyranch cfisd school-app',
    'github': 'https://github.com/sshh12/CyRanch-App',
    'start': 'May 25, 2016',
    'coolness': 8
  },
  {
    'title': 'CFISD App',
    'tagline': 'An app I created for Cypress Fairbanks ISD.',
    'tags': 'android apple school ionic cyranch cfisd school-app',
    'language': 'JS HTML CSS',
    'github': 'https://github.com/sshh12/CFISD-App',
    'start': 'May 14, 2018',
    'coolness': 5
  },
  {
    'title': 'CFISD API',
    'tagline': 'The Unofficial CFISD API.',
    'language': 'Python',
    'tags': 'api flask app web-app requests lxml cyranch',
    'url': 'https://cfisdapi.herokuapp.com/',
    'github': 'https://github.com/sshh12/CyRanch-App-Server',
    'start': 'Jan 20, 2017',
    'coolness': 6
  },
  {
    'title': 'SSHH.IO',
    'tagline': 'This website.',
    'tags': 'website gulp html5',
    'language': 'JS HTML CSS',
    'url': 'https://sshh.io',
    'github': 'https://github.com/sshh12/SSHH.IO',
    'start': 'Jul 5, 2018',
    'coolness': 4,
    'wip': true
  },
  {
    'title': '"Shrivu Bot"',
    'tagline': 'A personalized discord bot.',
    'tags': 'discord discord-bot discord-js',
    'language': 'JS',
    'github': 'https://github.com/sshh12/SSHHIO-Discord-Bot',
    'start': 'Dec 30, 2017',
    'coolness': 4
  },
  {
    'title': 'StockMarketML',
    'tagline': 'Predicting stocks with ML.',
    'tags': 'tensorflow keras stock-market stock-price-prediction',
    'language': 'Python',
    'github': 'https://github.com/sshh12/StockMarketML',
    'start': 'Sep 16, 2017',
    'coolness': 8
  },
  {
    'title': 'SchoolCode',
    'tagline': 'A collection of scripts/algorithms that I wrote for/were inspired by school projects.',
    'tags': 'school computer-science-algorithms ap-computer-science cyranch',
    'language': 'JS Java Python',
    'github': 'https://github.com/sshh12/SchoolCode',
    'start': 'Jun 5, 2017',
    'coolness': 7
  },
  {
    'title': 'JavaIsWeird',
    'tagline': 'A helpful collection of java stuff.',
    'tags': 'java guide handbook weird',
    'language': 'Java',
    'github': 'https://github.com/sshh12/JavaIsWeird',
    'start': 'Sep 1, 2017',
    'coolness': 5
  },
  {
    'title': 'MLCode',
    'tagline': 'A collection of scripts related to machine learning.',
    'tags': 'ML ai tensorflow coursera kaggle deeplearning',
    'language': 'Python Jupyter',
    'github': 'https://github.com/sshh12/MLCode',
    'start': 'Aug 13, 2017',
    'coolness': 2
  },
  {
    'title': 'Build-A-Bill',
    'tagline': 'Creating Legislation with AI',
    'tags': 'keras lstm char-rnn govtrack',
    'language': 'Python Jupyter',
    'github': 'https://github.com/sshh12/Build-A-Bill',
    'start': 'Jan 5, 2018',
    'coolness': 6
  },
  {
    'title': 'OverwatchML',
    'tagline': 'Overwatch + AI',
    'tags': 'overwatch ML ai keras',
    'language': 'Python Jupyter',
    'github': 'https://github.com/sshh12/OverwatchML',
    'start': 'Aug 25, 2017',
    'coolness': 7
  },
  {
    'title': 'Webcam Anomaly Detection',
    'tagline': 'An FTP server that logs anomalous motion from a camera stream.',
    'tags': 'ftp webcam pyftpdlib keras anomaly-detection skimage',
    'language': 'Python',
    'github': 'https://github.com/sshh12/Webcam-Anomaly-Detection',
    'start': 'Jun 4, 2017',
    'coolness': 6
  },
  {
    'title': 'Genetic Connect4',
    'tagline': 'Using evolution to evolve a minimax connect4 AI.',
    'tags': 'connect-four minimax evolution-simulation genetic-algorithms',
    'language': 'Python',
    'github': 'https://github.com/sshh12/Genetic-Connect4',
    'start': 'Jun 22, 2017',
    'coolness': 5
  },
  {
    'title': 'Students Visualization',
    'tagline': 'A Visualization of the Cy-Ranch Student Body',
    'tags': 'sklearn t-sne p5js cyranch cfisd matplotlib 3D',
    'language': 'JS HTML CSS Python',
    'github': 'https://github.com/sshh12/Students-Visualization',
    'start': 'Apr 28, 2017',
    'coolness': 8
  },
  {
    'title': 'RanchCoin',
    'tagline': 'A "Cryptocurrency" for EconFair',
    'tags': 'firebase cyranch digital-currency crypto',
    'language': 'JS HTML CSS',
    'url': 'https://ranchcoin.firebaseapp.com/',
    'github': 'https://github.com/sshh12/RanchCoin',
    'start': 'Apr 10, 2018',
    'coolness': 5
  },
  {
    'title': 'FaceTweet',
    'tagline': 'English Social Media Site Satire Project',
    'tags': 'firebase english satire friendly-pix',
    'language': 'JS HTML CSS',
    'url': 'https://facetweet-71a89.firebaseapp.com/',
    'github': 'https://github.com/sshh12/FaceTweet',
    'start': 'Mar 7, 2018',
    'coolness': 4
  },
  {
    'title': 'Rummy',
    'tagline': 'A full-stack app for playing multiplayer Rummy.',
    'tags': 'express-js fullstack js rummy',
    'language': 'JS HTML CSS',
    'github': 'https://github.com/sshh12/Rummy',
    'start': 'Jan 11, 2018',
    'coolness': 5
  },
  {
    'title': 'Ballz Bot',
    'tagline': 'A bot for Ballz.',
    'tags': 'game python bot pillow ballz pytesser',
    'language': 'Python',
    'github': 'https://github.com/sshh12/Ballz-Bot',
    'start': 'Apr 9, 2017',
    'coolness': 6
  },
  {
    'title': 'Recording Bot',
    'tagline': 'A bot built to record and transcribe audio fragments from Discord.',
    'tags': 'discord bot speech-recognition transcription',
    'language': 'JS Python',
    'github': 'https://github.com/sshh12/Recording-Bot',
    'start': 'May 23, 2017',
    'coolness': 6
  },
  {
    'title': 'PwnSSHH',
    'tagline': 'Python wrapper for the MR3040.',
    'tags': 'tp-link pineapple mr3040 minipwner',
    'language': 'Python',
    'github': 'https://github.com/sshh12/PwnSSHH',
    'start': 'Jul 14, 2017',
    'coolness': 4
  },
  {
    'title': 'Model Monitor',
    'tagline': 'An app for monitoring Keras models',
    'tags': 'keras android',
    'language': 'Kotlin',
    'github': 'https://github.com/sshh12/Model-Monitor-App',
    'start': 'Jun 10, 2018',
    'coolness': 5,
    'wip': true
  },
  {
    'title': 'ImageDissectionML',
    'tagline': 'Dissecting and manipulating images with ML',
    'tags': 'ML computer-vision',
    'language': 'Python',
    'github': 'https://github.com/sshh12/ImageDissectionML',
    'start': 'Apr 1, 2018',
    'coolness': 8,
    'wip': true
  },
  {
    'title': 'FlappyTilesOfThe48',
    'tagline': 'The Flappiest Tilest Game of the 2048 variety.',
    'tags': 'flappy-bird 2048 ionic piano-tiles',
    'language': 'JS HTML CSS',
    'github': 'https://github.com/sshh12/FlappyTilesOfThe48',
    'start': 'Dec 10, 2017',
    'coolness': 6,
    'wip': true
  },
  {
    'title': 'Money Classifier',
    'tagline': 'Charting expenses',
    'tags': 'ML chase textblob',
    'language': 'Python',
    'github': 'https://gist.github.com/sshh12/d362dba3f72498cd9604de63a659b870',
    'start': 'Jun 20, 2018',
    'coolness': 2,
    'tiny': true
  },
  {
    'title': 'CS UIL Data',
    'tagline': 'Analyzing Computer Science UIL data',
    'tags': 'pandas UIL',
    'language': 'Python Jupyter',
    'github': 'https://gist.github.com/sshh12/3bdb4daf63fb1bc00500c27f0a731fe8',
    'start': 'Mar 21, 2018',
    'coolness': 5,
    'tiny': true
  },
  {
    'title': 'Caterpillar Code',
    'tagline': 'func()()',
    'tags': 'random',
    'language': 'Python',
    'github': 'https://gist.github.com/sshh12/63cb074767d1f7032c3379652772b51e',
    'start': 'Dec 16, 2017',
    'coolness': 1,
    'tiny': true
  },
  {
    'title': 'DPS Checker',
    'tagline': 'Interfacing with a DPS kiosk',
    'tags': 'DPS crawler',
    'language': 'Python',
    'github': 'https://gist.github.com/sshh12/fc3867a218ed41ca6e4cd5e634b666f6',
    'start': 'Aug 1, 2017',
    'coolness': 6,
    'tiny': true
  },
  {
    'title': 'Probability Test',
    'tagline': 'Testing the probability of an even distribution of n numbers over k values.',
    'tags': 'math probability',
    'language': 'Python',
    'github': 'https://gist.github.com/sshh12/6186968785dd6f7b4c9a3b34aee9ac76',
    'start': 'Nov 5, 2017',
    'coolness': 1,
    'tiny': true
  },
  {
    'title': 'Count Lines',
    'tagline': 'Lines of code',
    'tags': 'counter utility',
    'language': 'Python',
    'github': 'https://gist.github.com/sshh12/17c07015d88824e601fff05f22a9df23',
    'start': 'Dec 19, 2017',
    'coolness': 1,
    'tiny': true
  },
  {
    'title': 'Titanic',
    'tagline': 'Anaylizing the Titanic',
    'tags': 'kaggle ML',
    'language': 'Python Jupyter',
    'github': 'https://github.com/sshh12/MLCode/blob/master/competitions/titanic/Titanic.ipynb',
    'kaggle': 'https://www.kaggle.com/c/titanic',
    'start': 'Mar 20, 2018',
    'coolness': 4,
    'tiny': true
  },
  {
    'title': 'Freq. Visualizer',
    'tagline': 'An interactive sound visualizer',
    'tags': 'sound interactive p5js',
    'language': 'CSS HTML JS',
    'url': '//TODO',
    'start': 'May 8, 2017',
    'coolness': 5
  },
  {
    'title': 'Web Toolkit',
    'tagline': 'A small collection of mobile web tools.',
    'tags': 'tools p5js mobile',
    'language': 'CSS HTML JS',
    'url': '//TODO',
    'start': 'Apr 22, 2017',
    'coolness': 4
  },
  {
    'title': 'Leet Typer',
    'tagline': 'Codin\' like a pro',
    'tags': 'typing leet',
    'language': 'CSS HTML JS',
    'url': '//TODO',
    'start': 'Apr 10, 2017',
    'coolness': 4,
    'tiny': true
  },
  {
    'title': 'Trump Physics',
    'tagline': 'An AP Physics project',
    'tags': 'physics video-analysis school',
    'language': 'HTML',
    'url': '//TODO',
    'start': 'Nov 15, 2017',
    'coolness': 1,
    'tiny': true
  },
  {
    'title': 'Case Viewer',
    'tagline': 'A parser to increase the efficiency of debate.',
    'tags': 'parser debate',
    'language': 'CSS HTML JS',
    'url': '//TODO',
    'start': 'Sep 30, 2017',
    'coolness': 6
  },
  {
    'title': 'L\'Homme Qui Plantait Des Arbres',
    'tagline': 'An interactive timeline for an AP French Book.',
    'tags': 'french interactive maps school',
    'language': 'CSS HTML JS',
    'url': '//TODO',
    'start': 'Nov 20, 2015',
    'coolness': 4
  },
  {
    'title': 'Genocide Project',
    'tagline': 'World History AP Genocide Project',
    'tags': 'WHAP history school',
    'language': 'HTML',
    'url': '//TODO',
    'start': 'April 10, 2016',
    'coolness': 3,
    'tiny': true
  },
  {
    'title': 'Le Mont Saint Michel',
    'tagline': 'AP French castle project',
    'tags': 'french 3D school',
    'language': 'HTML',
    'url': '//TODO',
    'start': 'Feb 15, 2016',
    'coolness': 4,
    'tiny': true
  },
  {
    'title': 'Revolution Meter',
    'tagline': 'US History tension visualized with cats.',
    'tags': 'history school',
    'language': 'HTML',
    'url': '//TOOD',
    'start': 'Nov 2, 2016',
    'coolness': 4,
    'tiny': true
  }
]
