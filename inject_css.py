import os
import re

pages_dir = r"c:\Users\hp\Documents\GitHub\portfolio-website\pages"
link_to_add = '    <link rel="stylesheet" href="../css/project-responsive.css">\n'
search = '<link rel="stylesheet" href="../css/style.css">'

for fname in os.listdir(pages_dir):
    if not fname.endswith('.html') or fname == 'project.html':
        continue
    fpath = os.path.join(pages_dir, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'project-responsive.css' in content:
        print(f"Already linked: {fname}")
        continue
    if search in content:
        content = content.replace(search, search + '\n' + link_to_add.rstrip('\n'))
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {fname}")
    else:
        print(f"Could not find search string in: {fname}")
