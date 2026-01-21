"𝗪𝗲 𝗻𝗲𝗲𝗱 𝘁𝗼 𝗲𝘅𝘁𝗿𝗮𝗰𝘁 𝗹𝗶𝗻𝗲 𝗶𝘁𝗲𝗺𝘀 𝗳𝗿𝗼𝗺 𝟱𝟬,𝟬𝟬𝟬 𝘀𝗰𝗮𝗻𝗻𝗲𝗱, 𝗺𝗲𝘀𝘀𝘆 𝗶𝗻𝘃𝗼𝗶𝗰𝗲𝘀. 𝗔𝗰𝗰𝘂𝗿𝗮𝗰𝘆 𝗺𝘂𝘀𝘁 𝗯𝗲 >𝟵𝟵%." 📄

The PM thinks "GPT-4V can read anything." The Engineer knows VLMs struggle with spatial coordinate precision.

🅰️ 𝗢𝗽𝘁𝗶𝗼𝗻 𝗔: 𝗣𝘂𝗿𝗲 𝗩𝗟𝗠 (𝗘𝗻𝗱-𝘁𝗼-𝗘𝗻𝗱) Feed the image of the invoice to the VLM. Ask for JSON output. 𝘛𝘩𝘦 𝘍𝘢𝘪𝘭𝘶𝘳𝘦: 𝗡𝘂𝗺𝗲𝗿𝗶𝗰 𝗛𝗮𝗹𝗹𝘂𝗰𝗶𝗻𝗮𝘁𝗶𝗼𝗻. The VLM reads "$100.00" as "$1000.00" because a speck of dust looked like a zero. It misses the "Total" row because it was at the bottom right (attention sink).

🅱️ 𝗢𝗽𝘁𝗶𝗼𝗻 𝗕: 𝗢𝗖𝗥 + 𝗟𝗟𝗠 (𝗧𝗲𝘅𝘁-𝗢𝗻𝗹𝘆) Run Tesseract/PaddleOCR, flatten the text, send to LLM. 𝘛𝘩𝘦 𝘍𝘢𝘪𝘭𝘶𝘳𝘦: 𝗟𝗼𝘀𝘀 𝗼𝗳 𝗟𝗮𝘆𝗼𝘂𝘁. The "Price" column gets mixed with the "Quantity" column because the whitespace was lost. The LLM can't figure out which number belongs to which header.

🔑 𝗧𝗵𝗲 "𝗧𝗵𝗶𝗿𝗱 𝗗𝗼𝗼𝗿" 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻: 𝗧𝗵𝗲 𝗦𝗲𝗻𝘁𝗶𝗻𝗲𝗹-𝗚𝘂𝗶𝗱𝗲𝗱 𝗔𝗻𝗰𝗵𝗼𝗿 We use a hybrid approach.

1. Run a cheap OCR model to get text + bounding box coordinates.
 
2. We draw 𝗩𝗶𝘀𝘂𝗮𝗹 𝗠𝗮𝗿𝗸𝗲𝗿𝘀 (e.g., red boxes with ID numbers) on the image around the text fields.
 
3. We feed the 𝘮𝘢𝘳𝘬𝘦𝘥 image to the VLM and say: "What value is in box #12?"
 
4. We validate the VLM's answer against the raw OCR text.
 

𝗧𝗵𝗲 𝗢𝘂𝘁𝗰𝗼𝗺𝗲: The VLM handles the semantic understanding ("This is a Tax field"), while the OCR provides the character-level ground truth.

📖 𝗧𝗵𝗲 𝗟𝗲𝘀𝘀𝗼𝗻: VLMs are for 𝗥𝗲𝗮𝘀𝗼𝗻𝗶𝗻𝗴. OCR is for 𝗥𝗲𝗮𝗱𝗶𝗻𝗴. Don't ask a philosopher to do a typist's job.
