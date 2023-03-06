import os
from app import create_app
from config import config

# app = create_app(os.getenv("FLASK_CONFIG") or "default")

app = create_app("default")
# if __name__ == '__main__':
#     app.run(port=8000, debug=True)

if os.getenv == 'default':
    print("this is default")
else:
    print("elseYOOOOO")
#     print(os.getenv("FLASK_CONFIG")

# app.run()

# if __name__ == '__main__':
#     app.run(port=8000, debug=True)

