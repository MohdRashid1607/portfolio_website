import os
import re

html_files = []
for root, dirs, files in os.walk(r'c:\Users\hp\Documents\GitHub\portfolio-website'):
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

social_snippet = """
                <a href="https://www.facebook.com/profile.php?id=100011667158403" target="_blank" title="Facebook"><i class='bx bxl-facebook'></i></a>
                <a href="#" target="_blank" title="Twitter"><i class='bx bxl-twitter'></i></a>
                <a href="http://instagram.com/mxhd.__/?hl=en" target="_blank" title="Instagram"><i class='bx bxl-instagram'></i></a>
                <a href="https://www.linkedin.com/in/muhammad-rashid-8b682a2a3/" target="_blank" title="LinkedIn"><i class='bx bxl-linkedin'></i></a>
                <a href="https://github.com/MohdRashid1607" target="_blank" title="GitHub"><i class='bx bxl-github'></i></a>
"""

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace social links
    content = re.sub(
        r'(<div class="footer-social">).*?(</div>)',
        r'\g<1>' + social_snippet + r'\g<2>',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'(<div class="social-media">).*?(</div>)',
        r'\g<1>' + social_snippet + r'\g<2>',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'(<div class="contact-social">).*?(</div>)',
        r'\g<1>' + social_snippet + r'\g<2>',
        content,
        flags=re.DOTALL
    )
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
        
# For index.html project links
index_path = r'c:\Users\hp\Documents\GitHub\portfolio-website\index.html'
with open(index_path, 'r', encoding='utf-8') as file:
    content = file.read()

# Portfolio links array to replace
projects_hrefs = [
    "pages/tomorrows-web.html",
    "pages/machine-learning.html",
    "pages/emerging-technologies.html",
    "pages/indie-game-design.html",
    "pages/creative-industry-challenge.html",
    "pages/web-dev-2.html"
]

for href in projects_hrefs:
    content = content.replace(f'href="{href}"', 'href="pages/project.html"')

content = content.replace('href="/pages/tomorrows-web.html"', 'href="/pages/project.html"')
content = content.replace('href="/pages/machine-learning.html"', 'href="/pages/project.html"')
content = content.replace('href="/pages/emerging-technologies.html"', 'href="/pages/project.html"')
content = content.replace('href="/pages/indie-game-design.html"', 'href="/pages/project.html"')
content = content.replace('href="/pages/creative-industry-challenge.html"', 'href="/pages/project.html"')
content = content.replace('href="/pages/web-dev-2.html"', 'href="/pages/project.html"')

with open(index_path, 'w', encoding='utf-8') as file:
    file.write(content)

print("Updates completed successfully.")
