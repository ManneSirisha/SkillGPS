export const courses = {
    'Data Scientist': {
        beginner: [
            { type: 'free', title: 'Data Science Curriculum', platform: 'freeCodeCamp', duration: 'Varies', rating: 4.8, outcome: 'Python, Data Structures, Analysis', link: 'https://www.freecodecamp.org/news/free-certifications/' },
            { type: 'free', title: 'Python', platform: 'Kaggle', duration: '5h', rating: 4.7, outcome: 'Python Syntax, Variables, Functions', link: 'https://www.kaggle.com/learn/python' },
            { type: 'free', title: 'Introduction to Data Science', platform: 'Cisco NetAcad', duration: '6h', rating: 4.6, outcome: 'Data Science Basics, AI/ML Overview', link: 'https://www.netacad.com/courses/introduction-data-science' },
            { type: 'free', title: 'Statistics & Probability', platform: 'Khan Academy', duration: 'Varies', rating: 4.8, outcome: 'Descriptive & Inferential Statistics', link: 'https://www.khanacademy.org/math/statistics-probability' },
            { type: 'free', title: 'Pandas', platform: 'Kaggle', duration: '4h', rating: 4.7, outcome: 'Data Manipulation, DataFrames', link: 'https://www.kaggle.com/learn/pandas' },
            { type: 'free', title: 'Data Visualization', platform: 'Kaggle', duration: '4h', rating: 4.7, outcome: 'Seaborn, Matplotlib', link: 'https://www.kaggle.com/learn/data-visualization' },
            { type: 'free', title: 'Intro to SQL', platform: 'Kaggle', duration: '3h', rating: 4.8, outcome: 'BigQuery, SQL Basics', link: 'https://www.kaggle.com/learn/intro-to-sql' },
            { type: 'paid', title: 'Data Science Professional Certificate', platform: 'Coursera (IBM)', duration: '10 months', rating: 4.6, outcome: 'Full Stack Data Science', link: 'https://www.coursera.org/professional-certificates/ibm-data-science' },
            { type: 'paid', title: 'Complete Python Bootcamp', platform: 'Udemy', duration: '22h', rating: 4.6, outcome: 'Python Essentials', link: 'https://www.udemy.com/course/complete-python-bootcamp/' }
        ],
        intermediate: [
            { type: 'free', title: 'Intro to Machine Learning', platform: 'Kaggle', duration: '3h', rating: 4.8, outcome: 'Decision Trees, Random Forests', link: 'https://www.kaggle.com/learn/intro-to-machine-learning' },
            { type: 'free', title: 'Data Science Methodology', platform: 'CognitiveClass.ai', duration: '5h', rating: 4.6, outcome: 'Methodology, Problem Solving', link: 'https://cognitiveclass.ai/courses' },
            { type: 'free', title: 'Python for Data Science', platform: 'CognitiveClass.ai', duration: 'Varies', rating: 4.7, outcome: 'Python, Pandas, NumPy', link: 'https://cognitiveclass.ai/courses' },
            { type: 'free', title: 'Big Data Essentials', platform: 'CognitiveClass.ai', duration: 'Varies', rating: 4.6, outcome: 'Big Data, Hadoop, Spark', link: 'https://cognitiveclass.ai/courses' },
            { type: 'paid', title: 'Machine Learning Specialization', platform: 'Coursera (Andrew Ng)', duration: '3 months', rating: 4.9, outcome: 'Supervised & Unsupervised Learning', link: 'https://www.coursera.org/specializations/machine-learning' },
            { type: 'paid', title: 'Applied Data Science with Python', platform: 'Coursera (UMich)', duration: '5 months', rating: 4.5, outcome: 'Data Viz, Text Mining, ML', link: 'https://www.coursera.org/specializations/data-science-python' },
            { type: 'paid', title: 'Data Scientist with Python', platform: 'DataCamp', duration: 'Varies', rating: 4.6, outcome: 'Hands-on R/Python', link: 'https://www.datacamp.com/tracks/data-scientist-with-python' }
        ],
        advanced: [
            { type: 'free', title: 'Data Science: R Basics', platform: 'Harvard', duration: 'Varies', rating: 4.6, outcome: 'R Programming, Data Wrangling', link: 'https://pll.harvard.edu/catalog/free' },
            { type: 'free', title: 'Advanced Python Projects', platform: 'Kaggle', duration: 'Varies', rating: 4.9, outcome: 'Real-world Projects', link: 'https://www.kaggle.com/competitions' },
            { type: 'free', title: 'Python & Data Science Full Course', platform: 'YouTube (freeCodeCamp)', duration: '12h+', rating: 4.9, outcome: 'Full Stack Data Science', link: 'https://www.youtube.com/results?search_query=freeCodeCamp+Python+Data+Science+full+course' },
            { type: 'paid', title: 'Deep Learning Specialization', platform: 'DeepLearning.AI', duration: '3 months', rating: 4.9, outcome: 'Neural Networks, CNNs, RNNs', link: 'https://www.deeplearning.ai/courses/deep-learning-specialization/' },
            { type: 'paid', title: 'PyTorch for Deep Learning', platform: 'Coursera', duration: 'Varies', rating: 4.7, outcome: 'Deep Learning with PyTorch', link: 'https://www.coursera.org/specializations/pytorch' },
            { type: 'paid', title: 'Natural Language Processing', platform: 'DeepLearning.AI', duration: '3 months', rating: 4.6, outcome: 'NLP, Transformers', link: 'https://www.coursera.org/specializations/natural-language-processing' },
            { type: 'paid', title: 'Big Data Specialization', platform: 'Coursera', duration: '6 months', rating: 4.5, outcome: 'Hadoop, Spark', link: 'https://www.coursera.org/specializations/big-data' },
            { type: 'paid', title: 'Professional Data Engineer', platform: 'Google Cloud', duration: 'Varies', rating: 4.7, outcome: 'Cloud Data Engineering', link: 'https://www.coursera.org/professional-certificates/google-cloud-data-engineer' },
            { type: 'paid', title: 'Machine Learning Specialty', platform: 'AWS', duration: 'Varies', rating: 4.7, outcome: 'Cloud ML Models', link: 'https://www.aws.training/Details/Certification/MLSP' },
            { type: 'paid', title: 'MLOps Specialization', platform: 'Coursera', duration: '4 months', rating: 4.8, outcome: 'ML Production Pipelines', link: 'https://www.coursera.org/specializations/mlops' },
            { type: 'paid', title: 'Data Science Career Track', platform: 'Springboard', duration: '6 months', rating: 4.6, outcome: 'Job Guarantee, Mentorship', link: 'https://www.springboard.com/courses/data-science-career/' }
        ]
    },
    'Backend Developer': {
        beginner: [
            { type: 'free', title: 'Node.js Basics', platform: 'Udemy', duration: '15h', rating: 4.7, outcome: 'Express, REST APIs', link: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/' },
            { type: 'free', title: 'Database Design', platform: 'Coursera', duration: '20h', rating: 4.5, outcome: 'SQL, NoSQL, Schema Design', link: 'https://www.coursera.org/learn/database-management' },
            { type: 'free', title: 'Back End Development and APIs', platform: 'freeCodeCamp', duration: '300h', rating: 4.9, outcome: 'Node.js, MongoDB', link: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/' },
            { type: 'free', title: 'MDN Web Docs - Server-side', platform: 'MDN', duration: 'Varies', rating: 4.8, outcome: 'Web Server Basics', link: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side' },
            { type: 'paid', title: 'IBM Full Stack Software Developer', platform: 'Coursera', duration: '11 months', rating: 4.6, outcome: 'Cloud Native Dev', link: 'https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer' },
            { type: 'paid', title: 'Meta Back-End Developer', platform: 'Coursera', duration: '8 months', rating: 4.7, outcome: 'Python, Django, APIs', link: 'https://www.coursera.org/professional-certificates/meta-back-end-developer' }
        ],
        intermediate: [
            { type: 'free', title: 'Advanced Backend Architecture', platform: 'Udacity', duration: '35h', rating: 4.8, outcome: 'Microservices, Caching, Queues', link: 'https://www.udacity.com/course/cloud-native-application-architecture-nanodegree--nd063' },
            { type: 'free', title: 'Java Programming', platform: 'Great Learning', duration: 'Varies', rating: 4.5, outcome: 'Java Foundations', link: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/java-programming' },
            { type: 'free', title: 'Dive Into Back-End Engineering', platform: 'CodeSignal', duration: '15h', rating: 4.8, outcome: 'Express.js Mastery', link: 'https://codesignal.com/learn/' },
            { type: 'paid', title: 'The Complete Node.js Developer Course', platform: 'Udemy', duration: '35h', rating: 4.7, outcome: 'Node, Express, MongoDB', link: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/' },
            { type: 'paid', title: 'Spring Boot 3, Spring 6 & Hibernate', platform: 'Udemy', duration: '38h', rating: 4.6, outcome: 'Java Spring Mastery', link: 'https://www.udemy.com/course/spring-hibernate-tutorial/' }
        ],
        advanced: [
            { type: 'free', title: 'System Design Interview', platform: 'Udemy', duration: '20h', rating: 4.9, outcome: 'Scalability, Load Balancing', link: 'https://www.udemy.com/course/system-design-interview-prep/' },
            { type: 'free', title: 'The System Design Primer', platform: 'GitHub (donnemartin)', duration: 'Varies', rating: 4.9, outcome: 'Scalable Systems', link: 'https://github.com/donnemartin/system-design-primer' },
            { type: 'free', title: 'High Scalability', platform: 'HighScalability.com', duration: 'Varies', rating: 4.8, outcome: 'Real-world Architecture', link: 'http://highscalability.com/' },
            { type: 'paid', title: 'Cloud Developer Nanodegree', platform: 'Udacity', duration: '4 months', rating: 4.7, outcome: 'Cloud Native Apps', link: 'https://www.udacity.com/course/cloud-developer-nanodegree--nd9990' },
            { type: 'paid', title: 'Software Engineering Career Track', platform: 'Springboard', duration: '9 months', rating: 4.8, outcome: 'Full Stack Mastery', link: 'https://www.springboard.com/workshops/software-engineering-career-track/' }
        ]
    },
    'AI/ML Engineer': {
        beginner: [
            // Free Resources
            { type: 'free', title: 'CS50: Intro to Computer Science', platform: 'Harvard', duration: '12 weeks', rating: 4.9, outcome: 'CS Fundamentals, Algorithms, Python', link: 'https://pll.harvard.edu/course/cs50s-introduction-computer-science' },
            { type: 'free', title: 'Elements of AI', platform: 'Univ. of Helsinki', duration: '30h', rating: 4.8, outcome: 'AI Basics, Ethics, Philosophy (No Math)', link: 'https://www.elementsofai.com/' },
            { type: 'free', title: 'Google Machine Learning Crash Course', platform: 'Google', duration: '15h', rating: 4.7, outcome: 'TensorFlow, Core ML Concepts', link: 'https://developers.google.com/machine-learning/crash-course' },
            { type: 'free', title: 'Python for Everybody', platform: 'Coursera (Audit)', duration: '40h', rating: 4.8, outcome: 'Python Programming, Data Structure', link: 'https://www.coursera.org/specializations/python' },
            { type: 'free', title: 'Machine Learning by Andrew Ng', platform: 'Coursera (Audit)', duration: '60h', rating: 4.9, outcome: 'Supervised Learning, Regression, Classification', link: 'https://www.coursera.org/learn/machine-learning' },
            { type: 'free', title: 'Kaggle Learn: ML & Data Science', platform: 'Kaggle', duration: '20h', rating: 4.7, outcome: 'Pandas, Scikit-Learn, Practical ML', link: 'https://www.kaggle.com/learn' },

            // Paid Courses
            { type: 'paid', title: 'CS50\'s Intro to CS (Verified)', platform: 'Harvard / edX', duration: '12 weeks', rating: 4.9, outcome: 'Certificate of Completion, Grading', link: 'https://pll.harvard.edu/course/cs50s-introduction-computer-science' },
            { type: 'paid', title: 'AI For Everyone', platform: 'DeepLearning.AI', duration: '10h', rating: 4.8, outcome: 'AI Strategy, Workflow, Terminology', link: 'https://www.coursera.org/learn/ai-for-everyone' },
            { type: 'paid', title: 'Machine Learning Engineer Path', platform: 'Codecademy', duration: '4 months', rating: 4.5, outcome: 'Interactive Coding: Python, Git, Scikit-learn', link: 'https://www.codecademy.com/learn/paths/machine-learning-engineer' }
        ],
        intermediate: [
            // Free Resources
            { type: 'free', title: 'Neural Networks and Deep Learning', platform: 'Coursera (Audit)', duration: '25h', rating: 4.9, outcome: 'Deep Neural Networks, Backprop', link: 'https://www.coursera.org/learn/neural-networks-deep-learning' },
            { type: 'free', title: 'Practical Deep Learning', platform: 'fast.ai', duration: '8 weeks', rating: 4.9, outcome: 'PyTorch, SOTA Models, Practical Coding', link: 'https://course.fast.ai' },
            { type: 'free', title: 'IBM Machine Learning with Python', platform: 'Coursera (Audit)', duration: '20h', rating: 4.6, outcome: 'Unsupervised Learning, Recommender Systems', link: 'https://www.coursera.org/learn/machine-learning-with-python' },
            { type: 'free', title: 'MIT Deep Learning', platform: 'MIT OCW', duration: '40h', rating: 4.8, outcome: 'Foundation Models, Deep Reinforcement Learning', link: 'https://ocw.mit.edu' },

            // Paid Courses
            { type: 'paid', title: 'Machine Learning Specialization', platform: 'Coursera (Andrew Ng)', duration: '3 months', rating: 4.9, outcome: 'Core ML: Regression, Classification, RL', link: 'https://www.coursera.org/specializations/machine-learning' },
            { type: 'paid', title: 'Machine Learning with Python', platform: 'IBM / Coursera', duration: '5 months', rating: 4.7, outcome: 'Data Science Pipelines, Model Selection', link: 'https://www.coursera.org/learn/machine-learning-with-python' },
            { type: 'paid', title: 'Deep Learning Specialization', platform: 'DeepLearning.AI', duration: '3 months', rating: 4.9, outcome: 'CNNs, RNNs, Transformers, TensorFlow', link: 'https://www.deeplearning.ai/courses/deep-learning-specialization/' },
            { type: 'paid', title: 'PyTorch for Deep Learning', platform: 'Coursera / DL.AI', duration: 'Varies', rating: 4.8, outcome: 'Building & Deploying PyTorch Models', link: 'https://www.coursera.org/search?query=pytorch' }
        ],
        advanced: [
            // Free Resources
            { type: 'free', title: 'Google Cloud ML & AI Training', platform: 'Google Cloud', duration: 'Varies', rating: 4.7, outcome: 'Vertex AI, Production ML', link: 'https://cloud.google.com/learn/training/machinelearning-ai' },
            { type: 'free', title: 'MLOps: Machine Learning Operations', platform: 'Made With ML', duration: '30h', rating: 4.9, outcome: 'End-to-End MLOps, Testing, Deployment', link: 'https://madewithml.com' },

            // Paid Courses
            { type: 'paid', title: 'Advanced AI on Google Cloud', platform: 'Google Cloud', duration: '3 months', rating: 4.7, outcome: 'BigQuery ML, Vertex AI, MLOps Pipelines', link: 'https://www.coursera.org/googlecloud' },
            { type: 'paid', title: 'NVIDIA Deep Learning Inst.', platform: 'NVIDIA', duration: 'Varies', rating: 4.9, outcome: 'CUDA, Computer Vision, DL at Scale', link: 'https://www.nvidia.com/en-in/training/online/' },
            { type: 'paid', title: 'NLP Specialization', platform: 'DeepLearning.AI', duration: '3 months', rating: 4.8, outcome: 'Transformers, Hugging Face, Attention', link: 'https://www.coursera.org/specializations/natural-language-processing' },
            { type: 'paid', title: 'Reinforcement Learning Spec', platform: 'Coursera / Alberta', duration: '4 months', rating: 4.8, outcome: 'Policy Gradients, Q-Learning, Agents', link: 'https://www.coursera.org/specializations/reinforcement-learning' },
            { type: 'paid', title: 'Docker & Kubernetes Bootcamp', platform: 'Udemy / Pluralsight', duration: '20h', rating: 4.7, outcome: 'Containerization, Orchestration for ML', link: 'https://www.udemy.com/' },
            { type: 'paid', title: 'Cloud ML Engineer Path', platform: 'AWS / Azure / GCP', duration: 'Varies', rating: 4.8, outcome: 'Professional AI/ML Certifications', link: 'https://cloud.google.com/certification/machine-learning-engineer' }
        ]
    },
    // Default fallback for other domains
    'default': {
        beginner: [
            { type: 'free', title: 'Domain Fundamentals', platform: 'Coursera', duration: '10h', rating: 4.5, outcome: 'Core Concepts', link: 'https://www.coursera.org/' }
        ],
        intermediate: [
            { type: 'free', title: 'Practical Application', platform: 'Udemy', duration: '20h', rating: 4.6, outcome: 'Real-world Projects', link: 'https://www.udemy.com/' }
        ],
        advanced: [
            { type: 'free', title: 'Mastery & Leadership', platform: 'Udacity', duration: '30h', rating: 4.8, outcome: 'Expert Level Skills', link: 'https://www.udacity.com/' }
        ]
    },
    'UI/UX Designer': {
        beginner: [
            { type: 'free', title: 'Google UX Design', platform: 'Coursera (Audit)', duration: 'Varies', rating: 4.8, outcome: 'UX Foundations, Wireframing', link: 'https://www.coursera.org/professional-certificates/google-ux-design' },
            { type: 'free', title: 'UX Fundamentals', platform: 'Interaction Design Found.', duration: 'Varies', rating: 4.7, outcome: 'UX Principles', link: 'https://www.interaction-design.org/courses' },
            { type: 'free', title: 'UX Design Full Course', platform: 'YouTube (freeCodeCamp)', duration: 'Varies', rating: 4.8, outcome: 'Complete UX Overview', link: 'https://www.youtube.com/watch?v=G3e2R2Hx3qs' }
        ],
        intermediate: [
            { type: 'free', title: 'Figma Tutorials', platform: 'Figma', duration: 'Varies', rating: 4.9, outcome: 'Design Tool Mastery', link: 'https://help.figma.com/hc/en-us/categories/360002052574-Learn-Design' },
            { type: 'free', title: 'Adobe XD Tutorials', platform: 'Adobe', duration: 'Varies', rating: 4.7, outcome: 'Prototyping', link: 'https://helpx.adobe.com/xd/tutorials.html' },
            { type: 'free', title: 'Sketch Resources', platform: 'Sketch', duration: 'Varies', rating: 4.6, outcome: 'UI Design', link: 'https://www.sketch.com/learn/' },
            { type: 'free', title: 'UX Research Articles', platform: 'NNGroup', duration: 'Varies', rating: 4.9, outcome: 'Research Methods', link: 'https://www.nngroup.com/articles' },
            { type: 'free', title: 'UX Basics', platform: 'Usability.gov', duration: 'Varies', rating: 4.8, outcome: 'Government UX Standards', link: 'https://www.usability.gov/what-and-why/user-experience.html' },
            { type: 'free', title: 'UX Crash Course', platform: 'The Hipper Element', duration: 'Varies', rating: 4.7, outcome: 'Practical UX', link: 'https://thehipperelement.com/post/ux-crash-course-2' }
        ],
        advanced: [
            { type: 'free', title: 'UX Research Methods', platform: 'Coursera (Audit)', duration: 'Varies', rating: 4.7, outcome: 'User Research', link: 'https://www.coursera.org' },
            { type: 'free', title: 'Psychology Basics', platform: 'Khan Academy', duration: 'Varies', rating: 4.8, outcome: 'Behavioral Science', link: 'https://www.khanacademy.org/science/health-and-medicine/behavioral-sciences' },
            { type: 'free', title: 'Interaction Design', platform: 'Interaction Design Found.', duration: 'Varies', rating: 4.9, outcome: 'Advanced Interaction', link: 'https://www.interaction-design.org/literature' },
            { type: 'free', title: 'Material Design', platform: 'Google', duration: 'Varies', rating: 4.9, outcome: 'Design System Guidelines', link: 'https://material.io/design' },
            { type: 'free', title: 'Inspiration & Portfolios', platform: 'Dribbble/Behance', duration: 'Varies', rating: 4.8, outcome: 'Visual Design Ideas', link: 'https://dribbble.com/' },
            { type: 'free', title: 'UX Case Studies', platform: 'uxdesign.cc', duration: 'Varies', rating: 4.8, outcome: 'Real-world Examples', link: 'https://uxdesign.cc/' }
        ]
    },
    'Product Manager': {
        beginner: [
            { type: 'free', title: 'Intro to Product Management', platform: 'Simplilearn SkillUp', duration: 'Varies', rating: 4.6, outcome: 'Product Lifecycle', link: 'https://www.simplilearn.com/learn-product-management-fundamentals-skillup' },
            { type: 'free', title: 'Product Management Training', platform: 'HubSpot Academy', duration: 'Varies', rating: 4.7, outcome: 'User Stories, Strategy', link: 'https://academy.hubspot.com/courses/product-management' },
            { type: 'free', title: 'Digital Product Management', platform: 'Coursera (Audit)', duration: 'Varies', rating: 4.7, outcome: 'Modern PM Practices', link: 'https://www.coursera.org/learn/uva-darden-digital-product-management' },
            { type: 'free', title: 'Intro to Agile Development', platform: 'Coursera (Audit)', duration: 'Varies', rating: 4.6, outcome: 'Agile & Scrum', link: 'https://www.coursera.org/learn/agile-development-and-scrum-introduction' },
            { type: 'paid', title: 'Product Manager Certificate', platform: 'Product School', duration: 'Varies', rating: 4.8, outcome: 'Full Lifecycle Certification', link: 'https://productschool.com/product-management-certification' },
            { type: 'paid', title: 'Certified Scrum Product Owner', platform: 'Scrum Alliance', duration: '2 days', rating: 4.8, outcome: 'Agile Product Ownership', link: 'https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner' },
            { type: 'paid', title: 'Professional Scrum Product Owner', platform: 'Scrum.org', duration: 'Varies', rating: 4.7, outcome: 'Value-driven PO', link: 'https://www.scrum.org/professional-scrum-product-owner-certifications' },
            { type: 'paid', title: 'Pragmatic Management', platform: 'Pragmatic Institute', duration: 'Varies', rating: 4.8, outcome: 'Market-Driven Strategy', link: 'https://www.pragmaticinstitute.com/course/foundations/' }
        ],
        intermediate: [
            { type: 'free', title: 'SQL for Data Science', platform: 'Coursera (Audit)', duration: 'Varies', rating: 4.6, outcome: 'SQL Queries, Joins', link: 'https://www.coursera.org/learn/sql-for-data-science' },
            { type: 'free', title: 'Intro to Databases & SQL', platform: 'Simplilearn', duration: 'Varies', rating: 4.7, outcome: 'Database Basics', link: 'https://www.simplilearn.com/free-sql-course-online' },
            { type: 'free', title: 'API Design Roadmap', platform: 'roadmap.sh', duration: 'Varies', rating: 4.9, outcome: 'API Architecture', link: 'https://roadmap.sh/api-design' },
            { type: 'free', title: 'Python for Data Science', platform: 'CognitiveClass.ai', duration: 'Varies', rating: 4.7, outcome: 'Data Analysis with Python', link: 'https://cognitiveclass.ai/courses/python-for-data-science' },
            { type: 'paid', title: 'Growth Series', platform: 'Reforge', duration: '4-6 weeks', rating: 4.9, outcome: 'Growth & Retention', link: 'https://www.reforge.com/growth-series' },
            { type: 'paid', title: 'SQL for Product Managers', platform: 'GoPractice', duration: 'Self-paced', rating: 4.8, outcome: 'Data-Informed Decisions', link: 'https://gopractice.io/course/sql/' },
            { type: 'paid', title: 'Technical Product Manager', platform: 'ProductHQ', duration: 'Self-paced', rating: 4.7, outcome: 'Technical Skills for PMs', link: 'https://producthq.org/' },
            { type: 'paid', title: 'Intermediate SQL', platform: 'Codecademy', duration: 'Varies', rating: 4.7, outcome: 'Funnels & Churn Analysis', link: 'https://www.codecademy.com/learn/learn-intermediate-sql-for-marketers-and-product-managers' }
        ],
        advanced: [
            { type: 'free', title: 'Product Discovery', platform: 'Product School', duration: 'Varies', rating: 4.8, outcome: 'Discovery Frameworks', link: 'https://productschool.com/resources/micro-certifications' },
            { type: 'free', title: 'Advanced Product Management', platform: 'Elevify', duration: 'Varies', rating: 4.7, outcome: 'Strategy & Leadership', link: 'https://elevify.com/' },
            { type: 'free', title: 'AI Product Management', platform: 'HelloPM', duration: 'Varies', rating: 4.8, outcome: 'GenAI, LLMs', link: 'https://www.hellopm.co/' },
            { type: 'paid', title: 'Product Strategy', platform: 'Kellogg School', duration: '2 months', rating: 4.8, outcome: 'Product Implementation', link: 'https://www.kellogg.northwestern.edu/executive-education/individual-programs/executive-programs/prodstrat.aspx' },
            { type: 'paid', title: 'Product Management Strategy', platform: 'Wharton', duration: '6 weeks', rating: 4.7, outcome: 'Go-to-Market Strategy', link: 'https://executiveeducation.wharton.upenn.edu/programs/online/product-management-and-strategy/' },
            { type: 'paid', title: 'Chief Product Officer Program', platform: 'Emeritus (Kellogg)', duration: '12 months', rating: 4.9, outcome: 'C-Suite Leadership', link: 'https://emeritus.org/school/kellogg/chief-product-officer-program/' },
            { type: 'paid', title: 'Product Management Program', platform: 'Berkeley ExecEd', duration: '5 days', rating: 4.8, outcome: 'Innovation & AI', link: 'https://executive.berkeley.edu/programs/product-management' }
        ]
    },
    'Cybersecurity Analyst': {
        beginner: [
            { type: 'paid', title: 'Google Cybersecurity Certificate', platform: 'Coursera', duration: '6 months', rating: 4.8, outcome: 'Job-Ready Skills', link: 'https://www.coursera.org/professional-certificates/google-cybersecurity' },
            { type: 'free', title: 'Introduction to Cybersecurity', platform: 'Cisco Networking Academy', duration: '6h', rating: 4.7, outcome: 'Cybersecurity Basics', link: 'https://www.netacad.com/courses/cybersecurity/introduction-cybersecurity' },
            { type: 'free', title: 'Cybersecurity Analyst Professional Certificate', platform: 'Coursera (IBM)', duration: '8 months', rating: 4.6, outcome: 'Analyst Skills', link: 'https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst' }
        ],
        intermediate: [
            { type: 'paid', title: 'CompTIA Security+', platform: 'CompTIA', duration: 'Varies', rating: 4.8, outcome: 'Core Security Skills', link: 'https://www.comptia.org/certifications/security' },
            { type: 'free', title: 'Pre-Security Path', platform: 'TryHackMe', duration: 'Varies', rating: 4.9, outcome: 'Hands-on Basics', link: 'https://tryhackme.com/path/outline/presecurity' },
            { type: 'paid', title: 'Security Operations Analyst (SC-200)', platform: 'Microsoft Learn', duration: 'Varies', rating: 4.7, outcome: 'Threat Mitigation', link: 'https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/' }
        ],
        advanced: [
            { type: 'paid', title: 'CISSP', platform: '(ISC)²', duration: 'Varies', rating: 4.9, outcome: 'Security Leadership', link: 'https://www.isc2.org/Certifications/CISSP' },
            { type: 'paid', title: 'Certified Ethical Hacker (CEH)', platform: 'EC-Council', duration: 'Varies', rating: 4.6, outcome: 'Penetration Testing', link: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/' },
            { type: 'paid', title: 'CompTIA Advanced Security Practitioner (CASP+)', platform: 'CompTIA', duration: 'Varies', rating: 4.7, outcome: 'Enterprise Security', link: 'https://www.comptia.org/certifications/comp-tia-advanced-security-practitioner-casp' }
        ]
    },
    'Cloud Engineer': {
        beginner: [
            { type: 'free', title: 'AWS Cloud Practitioner Essentials', platform: 'AWS Skill Builder', duration: '6h', rating: 4.8, outcome: 'AWS Cloud Basics', link: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials' },
            { type: 'paid', title: 'Azure Fundamentals (AZ-900)', platform: 'Microsoft Learn', duration: 'Varies', rating: 4.7, outcome: 'Azure Basics', link: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/' },
            { type: 'free', title: 'Google Cloud Digital Leader', platform: 'Google Cloud Skills Boost', duration: 'Varies', rating: 4.7, outcome: 'GCP Overview', link: 'https://www.cloudskillsboost.google/paths/9' }
        ],
        intermediate: [
            { type: 'paid', title: 'AWS Certified Solutions Architect - Associate', platform: 'AWS', duration: 'Varies', rating: 4.9, outcome: 'Scalable Systems', link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' },
            { type: 'paid', title: 'Azure Administrator Associate (AZ-104)', platform: 'Microsoft Learn', duration: 'Varies', rating: 4.7, outcome: 'Azure Admin', link: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/' },
            { type: 'paid', title: 'Google Associate Cloud Engineer', platform: 'Google Cloud', duration: 'Varies', rating: 4.8, outcome: 'GCP Deployment', link: 'https://cloud.google.com/certification/cloud-engineer' }
        ],
        advanced: [
            { type: 'paid', title: 'AWS Certified Solutions Architect - Professional', platform: 'AWS', duration: 'Varies', rating: 4.9, outcome: 'Complex Systems', link: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/' },
            { type: 'paid', title: 'Google Professional Cloud Architect', platform: 'Google Cloud', duration: 'Varies', rating: 4.9, outcome: 'Advanced Architecture', link: 'https://cloud.google.com/certification/cloud-architect' },
            { type: 'paid', title: 'Azure Solutions Architect Expert', platform: 'Microsoft Learn', duration: 'Varies', rating: 4.8, outcome: 'Expert Azure Solutions', link: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/' }
        ]
    },
    'Business Analyst': {
        beginner: [
            { type: 'free', title: 'Business basics', platform: 'OpenLearn', duration: 'Varies', rating: 4.5, outcome: 'What a business is, processes', link: 'https://www.open.edu/openlearn/money-business' },
            { type: 'free', title: 'Excel basics', platform: 'Excel Easy', duration: 'Varies', rating: 4.7, outcome: 'Formulas, pivot tables, charts', link: 'https://www.excel-easy.com' },
            { type: 'free', title: 'BA introduction', platform: 'Modern Analyst', duration: 'Varies', rating: 4.6, outcome: 'BA role, requirements', link: 'https://www.modernanalyst.com' },
            { type: 'free', title: 'Statistics', platform: 'Khan Academy', duration: 'Varies', rating: 4.8, outcome: 'Mean, variance, probability', link: 'https://www.khanacademy.org/math/statistics-probability' },
            { type: 'paid', title: 'Business Analysis Fundamentals', platform: 'Coursera (Microsoft)', duration: 'Varies', rating: 4.7, outcome: 'Requirements, Process Analysis', link: 'https://www.coursera.org/courses?query=business%20analysis' },
            { type: 'paid', title: 'Business Analyst Professional Certificate', platform: 'Coursera (IBM)', duration: 'Varies', rating: 4.7, outcome: 'Storytelling, Modeling', link: 'https://www.coursera.org/courses?query=IBM%20Business%20Analyst' }
        ],
        intermediate: [
            { type: 'free', title: 'SQL basics', platform: 'Kaggle', duration: '3h', rating: 4.8, outcome: 'SELECT, WHERE, JOIN', link: 'https://www.kaggle.com/learn/intro-to-sql' },
            { type: 'free', title: 'SQL advanced', platform: 'Mode', duration: 'Varies', rating: 4.7, outcome: 'Subqueries, window functions', link: 'https://mode.com/sql-tutorial' },
            { type: 'free', title: 'Data analysis', platform: 'Kaggle', duration: 'Varies', rating: 4.7, outcome: 'Data analysis logic, scripting', link: 'https://www.kaggle.com/learn/python' },
            { type: 'free', title: 'Data handling', platform: 'Pandas Docs', duration: 'Varies', rating: 4.8, outcome: 'Cleaning, filtering, aggregation', link: 'https://pandas.pydata.org/docs' },
            { type: 'free', title: 'Dashboards', platform: 'Looker Studio', duration: 'Varies', rating: 4.6, outcome: 'Business dashboards, KPIs', link: 'https://support.google.com/looker-studio' },
            { type: 'free', title: 'Visualization', platform: 'Tableau Public', duration: 'Varies', rating: 4.7, outcome: 'Charts, dashboards, storytelling', link: 'https://www.tableau.com/learn/training' },
            { type: 'paid', title: 'Business Analytics with Excel', platform: 'Coursera (JHU)', duration: 'Varies', rating: 4.8, outcome: 'Advanced Excel, Analytics', link: 'https://www.coursera.org/courses?query=Business%20Analytics%20with%20Excel' },
            { type: 'paid', title: 'Power BI Data Analyst', platform: 'Coursera (Microsoft)', duration: 'Varies', rating: 4.6, outcome: 'Power BI, Data Modeling', link: 'https://www.coursera.org/courses?query=Power%20BI%20Data%20Analyst' }
        ],
        advanced: [
            { type: 'free', title: 'Process modeling', platform: 'BA Times', duration: 'Varies', rating: 4.6, outcome: 'BPMN, use cases, workflows', link: 'https://www.batimes.com' },
            { type: 'free', title: 'Advanced Excel', platform: 'Microsoft', duration: 'Varies', rating: 4.7, outcome: 'Power Query, advanced formulas', link: 'https://support.microsoft.com/excel' },
            { type: 'free', title: 'Statistics', platform: 'MIT OCW', duration: 'Varies', rating: 4.9, outcome: 'Statistical reasoning', link: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics' },
            { type: 'free', title: 'Real projects', platform: 'Kaggle', duration: 'Varies', rating: 4.8, outcome: 'End-to-end analysis projects', link: 'https://www.kaggle.com/datasets' },
            { type: 'paid', title: 'Business Analysis & Process Management', platform: 'Coursera', duration: 'Varies', rating: 4.4, outcome: 'Process mapping, BPMN', link: 'https://www.coursera.org/learn/business-analysis-process-management' },
            { type: 'paid', title: 'ECBA® Prep & IIBA Certifications', platform: 'IIBA', duration: 'Varies', rating: 4.8, outcome: 'International Certification', link: 'https://www.iiba.org/business-analysis-certifications/ecba/' },
            { type: 'paid', title: 'Business Analytics Program', platform: 'IMS Proschool', duration: 'Varies', rating: 4.5, outcome: 'Practical Case Studies', link: 'https://www.proschoolonline.com/business-analytics-course' },
            { type: 'paid', title: 'Business Analytics & Intelligence', platform: 'IIM Rohtak', duration: 'Varies', rating: 4.6, outcome: 'Analytics & Modeling', link: 'https://uptopcareers.com' },
            { type: 'paid', title: 'SAS Academy Business Analyst', platform: 'SAS', duration: 'Varies', rating: 4.7, outcome: 'SAS Viya, Analytics', link: 'https://www.sas.com/en_us/training/academy-data-science/business-analyst-certification.html' },
            { type: 'paid', title: 'Business Analytics', platform: 'Harvard Business School', duration: 'Varies', rating: 4.9, outcome: 'Data Interpretation', link: 'https://pll.harvard.edu/subject/business-analysis' },
            { type: 'paid', title: 'Business Analytics Online', platform: 'Columbia Business School', duration: 'Varies', rating: 4.8, outcome: 'Strategic Tools', link: 'https://execed.business.columbia.edu/programs/business-analytics-online' }
        ]
    },
    'Data Analyst': {
        beginner: [
            { type: 'free', title: 'Google Data Analytics Certificate', platform: 'Coursera (Audit)', duration: '6 months', rating: 4.8, outcome: 'Data Analysis, SQL, Visualization', link: 'https://www.coursera.org/professional-certificates/google-data-analytics' },
            { type: 'free', title: 'SQL for Data Analysis', platform: 'Kaggle', duration: '4h', rating: 4.8, outcome: 'SQL Basics, Queries, Joins', link: 'https://www.kaggle.com/learn/intro-to-sql' },
            { type: 'free', title: 'Excel Skills for Business', platform: 'Coursera (Audit)', duration: 'Varies', rating: 4.8, outcome: 'Excel Functions, Pivot Tables', link: 'https://www.coursera.org/specializations/excel' },
            { type: 'free', title: 'Statistics Fundamentals', platform: 'Khan Academy', duration: 'Varies', rating: 4.8, outcome: 'Descriptive & Inferential Stats', link: 'https://www.khanacademy.org/math/statistics-probability' },
            { type: 'free', title: 'Data Analysis with Python', platform: 'freeCodeCamp', duration: '10h', rating: 4.7, outcome: 'NumPy, Pandas, Matplotlib', link: 'https://www.freecodecamp.org/learn/data-analysis-with-python/' },
            { type: 'paid', title: 'IBM Data Analyst Certificate', platform: 'Coursera', duration: '11 months', rating: 4.6, outcome: 'Complete Data Analytics', link: 'https://www.coursera.org/professional-certificates/ibm-data-analyst' },
            { type: 'paid', title: 'Data Analysis Nanodegree', platform: 'Udacity', duration: '4 months', rating: 4.5, outcome: 'Real-world Projects', link: 'https://www.udacity.com/course/data-analyst-nanodegree--nd002' }
        ],
        intermediate: [
            { type: 'free', title: 'Advanced SQL', platform: 'Mode Analytics', duration: 'Varies', rating: 4.7, outcome: 'Complex Queries, Window Functions', link: 'https://mode.com/sql-tutorial/intro-to-advanced-sql/' },
            { type: 'free', title: 'Tableau Public Training', platform: 'Tableau', duration: 'Varies', rating: 4.8, outcome: 'Data Visualization Mastery', link: 'https://www.tableau.com/learn/training/20231' },
            { type: 'free', title: 'Data Cleaning with Python', platform: 'Kaggle', duration: 'Varies', rating: 4.7, outcome: 'Data Wrangling Techniques', link: 'https://www.kaggle.com/learn/data-cleaning' },
            { type: 'free', title: 'Google Analytics Academy', platform: 'Google', duration: 'Varies', rating: 4.7, outcome: 'Web Analytics, GA4', link: 'https://analytics.google.com/analytics/academy/' },
            { type: 'paid', title: 'Data Analyst with SQL and Tableau', platform: 'DataCamp', duration: 'Varies', rating: 4.6, outcome: 'SQL + Visualization Skills', link: 'https://www.datacamp.com/tracks/data-analyst-with-sql-server' },
            { type: 'paid', title: 'Microsoft Power BI Data Analyst', platform: 'Coursera', duration: 'Varies', rating: 4.7, outcome: 'Power BI Certification Prep', link: 'https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst' },
            { type: 'paid', title: 'Statistics for Data Analysis', platform: 'Udemy', duration: '25h', rating: 4.6, outcome: 'Statistical Inference, Hypothesis Testing', link: 'https://www.udemy.com/course/statistics-for-data-science/' }
        ],
        advanced: [
            { type: 'free', title: 'A/B Testing Course', platform: 'Udacity', duration: 'Varies', rating: 4.7, outcome: 'Experiment Design, Analysis', link: 'https://www.udacity.com/course/ab-testing--ud257' },
            { type: 'free', title: 'Advanced Data Wrangling', platform: 'Kaggle', duration: 'Varies', rating: 4.8, outcome: 'Complex Data Transformations', link: 'https://www.kaggle.com/learn' },
            { type: 'free', title: 'Data Warehousing Concepts', platform: 'YouTube', duration: 'Varies', rating: 4.6, outcome: 'ETL, Data Modeling', link: 'https://www.youtube.com' },
            { type: 'paid', title: 'Business Intelligence Specialization', platform: 'Coursera', duration: '5 months', rating: 4.7, outcome: 'BI Strategy, Implementation', link: 'https://www.coursera.org/specializations/business-intelligence' },
            { type: 'paid', title: 'Data Engineering Fundamentals', platform: 'DataCamp', duration: 'Varies', rating: 4.6, outcome: 'ETL Pipelines, Data Quality', link: 'https://www.datacamp.com/tracks/data-engineer' },
            { type: 'paid', title: 'Advanced Analytics with Excel', platform: 'Udemy', duration: '20h', rating: 4.7, outcome: 'Power Query, Power Pivot, VBA', link: 'https://www.udemy.com/course/microsoft-excel-advanced/' },
            { type: 'paid', title: 'Predictive Analytics Certificate', platform: 'Coursera', duration: '6 months', rating: 4.6, outcome: 'Forecasting, Predictive Modeling', link: 'https://www.coursera.org/specializations/predictive-analytics' }
        ]
    }
};

// Utility function to get all available career domains
export const getAllDomains = () => {
    return Object.keys(courses).filter(key => key !== 'default');
};
