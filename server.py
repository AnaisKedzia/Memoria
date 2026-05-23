import os
import json
from http.server import SimpleHTTPRequestHandler, HTTPServer
from app import graph

APP_DIR = "app"
SAVE_PATH = os.path.join(APP_DIR, "data.json")

class Handler(SimpleHTTPRequestHandler):
    """Redéfinition des chemins d'accès"""
    def translate_path(self, path):
        base_dir = os.path.join(os.getcwd(), "app")

        if path == "" or path == "/":
            return os.path.join(base_dir, "html", "index.html")

        path = path.split("?", 1)[0]
        trailing = path.lstrip('/')
        full_path = os.path.join(base_dir, trailing)
        return full_path
    
    def do_POST(self):
        if self.path != "/save":
            self.send_error(404, "Not found")
            return
        
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length == 0:
            self.send_error(400, "No data provided")
            return
        
        try :
            raw_data = self.rfile.read(content_length)
            data = json.loads(raw_data.decode("utf-8"))
        except Exception :
            self.send_error(400, "Invalid JSON : " + str(Exception))
        
        try:
            with open(SAVE_PATH, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
        except Exception:
            self.send_error(500, "Failed to save : " + str(Exception))
            return
        
        try: 
            with open("app\data.json", encoding="utf-8") as f: 
                decks = json.load(f)
        except Exception:
            self.send_error(404, "File not found : " + str(Exception))

        try: 
            graph.process_decks(decks)
        except Exception:
            self.send_error(500, "An error occured : " + str(Exception))
        
        self.send_response(200)
        self.send_header("Content-Type", "application.json")
        self.end_headers()
        self.wfile.write(b'{"status":"ok"}')

if __name__ == "__main__":
    port = 8000
    server = HTTPServer(("", port), Handler)
    print(f"Hébergement de Memoria sur http://localhost:{port}/")

    try :
        server.serve_forever()
    
    except KeyboardInterrupt :
        server.server_close()

    