#!/usr/bin/env python3
import os
import subprocess

OUT_DIR_PUBLIC = "public/assets/videos"
OUT_DIR_DIST = "dist/assets/videos"
os.makedirs(OUT_DIR_PUBLIC, exist_ok=True)
os.makedirs(OUT_DIR_DIST, exist_ok=True)

FONT = "/usr/share/fonts/truetype/freefont/FreeSerif.ttf"

def generate_video(filename, title, subtitle, shape_name, sections):
    temp_dir = f"/tmp/{filename}_frames"
    os.makedirs(temp_dir, exist_ok=True)
    
    # We will construct an ffmpeg filter complex with multiple timed scenes
    # Duration: 15s total (3 scenes of 5s each)
    # Scene 1: Introduction & Concept
    # Scene 2: Geometric Elements & Rotation
    # Scene 3: Formulas & Summary
    
    s1_text = f"GEOMETRY LAB TOAN 9\\n\\nVIDEO BAI HOC: {shape_name.upper()}\\n\\n{title}"
    s2_text = f"CAU TAO & CAC YEU TO CUA {shape_name.upper()}\\n\\n{sections[0]}\\n\\n{sections[1]}"
    s3_text = f"CONG THUC TRONG TAM {shape_name.upper()}\\n\\n{sections[2]}\\n\\n{sections[3]}"
    
    out_public = os.path.join(OUT_DIR_PUBLIC, filename)
    out_dist = os.path.join(OUT_DIR_DIST, filename)
    poster_public = os.path.join(OUT_DIR_PUBLIC, filename.replace('.mp4', '_poster.jpg'))
    poster_dist = os.path.join(OUT_DIR_DIST, filename.replace('.mp4', '_poster.jpg'))
    
    # Complex filter creating 15s video
    # Write text to files to avoid escaping colons or special chars
    txt_files = []
    for i, sec in enumerate(sections):
        tf = f"/tmp/{filename}_s{i}.txt"
        with open(tf, "w") as f:
            f.write(sec)
        txt_files.append(tf)

    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", "color=c=0x0f172a:s=1280x720:d=15:r=30",
        "-f", "lavfi", "-i", "sine=frequency=220:beep_factor=4:duration=15",
        "-vf", (
            f"drawbox=x=40:y=40:w=1200:h=640:color=0x38bdf8@0.3:t=4,"
            f"drawbox=x=60:y=60:w=1160:h=100:color=0x1e293b@0.8:t=fill,"
            f"drawtext=fontfile={FONT}:text='GEOMETRY LAB - TOAN LOP 9':fontcolor=0x38bdf8:fontsize=32:x=80:y=95,"
            # Scene 1 (0 to 5s)
            f"drawtext=fontfile={FONT}:text='PHAN 1 - KHAI NIEM & SU TAO THANH':fontcolor=0x38bdf8:fontsize=34:x=100:y=200:enable='between(t,0,5)',"
            f"drawtext=fontfile={FONT}:textfile={txt_files[0]}:fontcolor=0xf1f5f9:fontsize=28:x=100:y=280:enable='between(t,0,5)',"
            f"drawtext=fontfile={FONT}:textfile={txt_files[1]}:fontcolor=0x94a3b8:fontsize=24:x=100:y=360:enable='between(t,0,5)',"
            # Scene 2 (5 to 10s)
            f"drawtext=fontfile={FONT}:text='PHAN 2 - CAC YEU TO HINH HOC':fontcolor=0x38bdf8:fontsize=34:x=100:y=200:enable='between(t,5,10)',"
            f"drawtext=fontfile={FONT}:textfile={txt_files[2]}:fontcolor=0xf1f5f9:fontsize=28:x=100:y=280:enable='between(t,5,10)',"
            f"drawtext=fontfile={FONT}:textfile={txt_files[3]}:fontcolor=0x94a3b8:fontsize=24:x=100:y=360:enable='between(t,5,10)',"
            # Scene 3 (10 to 15s)
            f"drawtext=fontfile={FONT}:text='PHAN 3 - CONG THUC TRONG TAM':fontcolor=0x38bdf8:fontsize=34:x=100:y=200:enable='between(t,10,15)',"
            f"drawtext=fontfile={FONT}:textfile={txt_files[4]}:fontcolor=0xfde047:fontsize=30:x=100:y=280:enable='between(t,10,15)',"
            f"drawtext=fontfile={FONT}:textfile={txt_files[5]}:fontcolor=0x4ade80:fontsize=30:x=100:y=360:enable='between(t,10,15)',"
            # Bottom progress bar
            f"drawbox=x=60:y=620:w=1160:h=12:color=0x334155:t=fill,"
            f"drawbox=x=60:y=620:w='min(1160,1160*t/15)':h=12:color=0x0284c7:t=fill"
        ),
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "3.1",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        out_public
    ]
    print(f"Generating {out_public}...")
    subprocess.run(cmd, check=True)
    
    # Copy to dist
    subprocess.run(["cp", out_public, out_dist], check=True)
    
    # Generate poster image at t=2.0s
    poster_cmd = [
        "ffmpeg", "-y", "-ss", "00:00:02", "-i", out_public,
        "-vframes", "1", "-q:v", "2", poster_public
    ]
    subprocess.run(poster_cmd, check=True)
    subprocess.run(["cp", poster_public, poster_dist], check=True)
    print(f"Done: {out_public} & poster generated.")

# 1. HÌNH TRỤ -> tru.mp4
generate_video(
    filename="tru.mp4",
    title="Bài học Hình trụ - Khái niệm & Công thức",
    subtitle="Xem video để hiểu trực quan về hình trụ.",
    shape_name="Hình trụ",
    sections=[
        "Quay mot hinh chu nhat ABCD mot vong quanh canh CD co dinh.",
        "Ta duoc mot hinh tru: hai mat day la hai hinh tron bang nhau (tam D va C).",
        "Ban kinh day: R = DA = CB | Chieu cao: h = CD.",
        "Cac duong sinh song song va bang chieu cao h cua hinh tru.",
        "Dien tich xung quanh: S_xq = 2 * pi * R * h  |  S_tp = S_xq + 2 * S_day",
        "The tich hinh tru: V = S_day * h = pi * R^2 * h"
    ]
)

# 2. HÌNH CẦU -> cau.mp4
generate_video(
    filename="cau.mp4",
    title="Bài học Hình cầu - Khái niệm & Công thức",
    subtitle="Xem video để hiểu trực quan về hình cầu.",
    shape_name="Hình cầu",
    sections=[
        "Quay mot nua hinh tron duong kinh AB mot vong quanh AB co dinh.",
        "Ta duoc mot hinh cau: nua duong tron quet nen mat cau.",
        "Tam hinh cau: O (trung diem AB) | Ban kinh: R = OA = OB.",
        "Mat cat cua hinh cau boi mat phang di qua tam la hinh tron lon ban kinh R.",
        "Dien tich mat cau: S = 4 * pi * R^2 = pi * d^2",
        "The tich khoi cau: V = (4/3) * pi * R^3"
    ]
)

# 3. HÌNH NÓN -> non.mp4
generate_video(
    filename="non.mp4",
    title="Bài học Hình nón - Khái niệm & Công thức",
    subtitle="Xem video để hiểu trực quan về hình nón.",
    shape_name="Hình nón",
    sections=[
        "Quay mot tam giac vuong SOA mot vong quanh canh goc vuong SO co dinh.",
        "Ta duoc mot hinh non: day la hinh tron tam O ban kinh OA.",
        "Dinh: S | Duong cao: h = SO | Ban kinh day: r = OA | Duong sinh: l = SA.",
        "Moi quan he Pytago giua cac yeu to: l^2 = h^2 + r^2",
        "Dien tich xung quanh: S_xq = pi * r * l  |  S_tp = pi * r * l + pi * r^2",
        "The tich hinh non: V = (1/3) * pi * r^2 * h"
    ]
)

print("All 3 fixed video assets successfully generated!")
