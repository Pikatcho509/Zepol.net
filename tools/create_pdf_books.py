import os
import re

root_dir = os.path.join(os.path.dirname(__file__), '..')
library_path = os.path.join(root_dir, 'modules', 'library.js')
pdf_dir = os.path.join(root_dir, 'assets', 'pdf')
os.makedirs(pdf_dir, exist_ok=True)

with open(library_path, 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r'pdfUrl:\s*"(assets/pdf/[^"]+)"', content)

if not matches:
    raise ValueError('No pdfUrl entries found in library.js')

for pdf_url in sorted(set(matches)):
    filename = os.path.basename(pdf_url)
    title = filename.replace('.pdf', '').replace('_', ' ').capitalize()
    author = 'Zepòl Bibliyotèk'
    text = 'Yon liv ki ede w elaji lespri w sou byennèt ak sipò.'

    lines = [
        '%PDF-1.4',
        '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
        '2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj',
        '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
        '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    ]
    content_stream = f"BT /F1 18 Tf 72 720 Td ({title}) Tj ET BT /F1 12 Tf 72 690 Td (by {author}) Tj ET BT /F1 12 Tf 72 660 Td ({text}) Tj ET"
    stream = f'5 0 obj << /Length {len(content_stream)} >> stream\n{content_stream}\nendstream endobj'
    full = '\n'.join(lines + [stream]) + '\n'
    offsets = []
    pos = 0
    for part in full.split('\n'):
        offsets.append(pos)
        pos += len(part) + 1
    xref_pos = pos
    xref_lines = ['xref', '0 6', '0000000000 65535 f '] + [f'{offsets[i+1]:010d} 00000 n ' for i in range(5)]
    trailer = f'trailer << /Root 1 0 R /Size 6 >>\nstartxref\n{xref_pos}\n%%EOF\n'
    pdf = full + '\n'.join(xref_lines) + '\n' + trailer

    path = os.path.join(pdf_dir, filename)
    with open(path, 'wb') as f:
        f.write(pdf.encode('latin1'))
    print(f'created {path}')
