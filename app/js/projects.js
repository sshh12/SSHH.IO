
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
    'language': '',
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
    'github': 'https://github.com/sshh12/SSHH.IO',
    'start': 'Jul 5, 2018',
    'wip': true,
    'coolness': 4
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
    'tags': 'machine-learning ai tensorflow coursera kaggle deeplearning',
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
    'tags': 'overwatch machine-learning ai keras',
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
    'tags': 'sklearn t-sne p5js cyranch cfisd matplotlib',
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
    'title': 'PwnSSHH',
    'tagline': 'Python wrapper for the MR3040.',
    'tags': 'tp-link pineapple mr3040 minipwner',
    'language': 'Python',
    'github': 'https://github.com/sshh12/PwnSSHH',
    'start': 'Jul 14, 2017',
    'coolness': 4
  }
]
