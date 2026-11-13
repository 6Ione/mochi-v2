#!/usr/bin/env python3
"""Mochi static local HTTP host. No reverse proxy, uploads or payload injection."""
import http.server
from functools import partial
class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      '.js':'application/javascript', '.manifest':'text/cache-manifest',
                      '.bin':'application/octet-stream', '.elf':'application/octet-stream'}
    def end_headers(self):
        self.send_header('Cache-Control','no-cache')
        super().end_headers()
if __name__=='__main__':
    print('Serving on port 8082. Only use on a trusted private LAN. Ctrl+C to exit.')
    http.server.ThreadingHTTPServer(('0.0.0.0',8082),Handler).serve_forever()
