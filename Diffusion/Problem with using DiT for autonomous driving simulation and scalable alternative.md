𝙏𝙝𝙚 𝙋𝙖𝙥𝙚𝙧 𝙑𝙨 𝙋𝙧𝙤𝙙𝙪𝙘𝙩𝙞𝙤𝙣 𝙬𝙞𝙩𝙝 𝘿𝙞𝙛𝙛𝙪𝙨𝙞𝙤𝙣 𝙈𝙤𝙙𝙚𝙡𝙨 📷

You're in a Computer Vision Research interview at Wayve. The interviewer asks:

"𝘞𝘦 𝘯𝘦𝘦𝘥 𝘵𝘰 𝘣𝘶𝘪𝘭𝘥 𝘢 𝘨𝘦𝘯𝘦𝘳𝘢𝘵𝘪𝘷𝘦 𝘷𝘪𝘥𝘦𝘰 𝘮𝘰𝘥𝘦𝘭 𝘧𝘰𝘳 𝘢𝘶𝘵𝘰𝘯𝘰𝘮𝘰𝘶𝘴 𝘥𝘳𝘪𝘷𝘪𝘯𝘨 𝘴𝘪𝘮𝘶𝘭𝘢𝘵𝘪𝘰𝘯. 𝘞𝘩𝘺 𝘮𝘪𝘨𝘩𝘵 𝘸𝘦 𝘳𝘦𝘨𝘳𝘦𝘵 𝘣𝘦𝘵𝘵𝘪𝘯𝘨 𝘵𝘩𝘦 𝘦𝘯𝘵𝘪𝘳𝘦 𝘧𝘢𝘳𝘮 𝘰𝘯 𝘋𝘪𝘧𝘧𝘶𝘴𝘪𝘰𝘯 𝘛𝘳𝘢𝘯𝘴𝘧𝘰𝘳𝘮𝘦𝘳𝘴 (𝘋𝘪𝘛), 𝘢𝘯𝘥 𝘸𝘩𝘢𝘵 𝘪𝘴 𝘵𝘩𝘦 𝘴𝘤𝘢𝘭𝘢𝘣𝘭𝘦 𝘢𝘭𝘵𝘦𝘳𝘯𝘢𝘵𝘪𝘷𝘦 𝘵𝘩𝘢𝘵 𝘵𝘳𝘦𝘢𝘵𝘴 𝘱𝘪𝘹𝘦𝘭𝘴 𝘭𝘪𝘬𝘦 𝘭𝘢𝘯𝘨𝘶𝘢𝘨𝘦?"

90% of candidates say:
"𝘋𝘪𝘧𝘧𝘶𝘴𝘪𝘰𝘯 𝘪𝘴 𝘚𝘖𝘛𝘈. 𝘞𝘦 𝘴𝘩𝘰𝘶𝘭𝘥 𝘰𝘱𝘵𝘪𝘮𝘪𝘻𝘦 𝘵𝘩𝘦 𝘋𝘪𝘛 𝘢𝘳𝘤𝘩𝘪𝘵𝘦𝘤𝘵𝘶𝘳𝘦 𝘸𝘪𝘵𝘩 𝘧𝘭𝘰𝘸 𝘮𝘢𝘵𝘤𝘩𝘪𝘯𝘨."

𝗪𝗿𝗼𝗻𝗴. You just locked your inference latency to a crawl.

The candidate is betting on 𝗶𝘁𝗲𝗿𝗮𝘁𝗶𝘃𝗲 𝗱𝗲𝗻𝗼𝗶𝘀𝗶𝗻𝗴.

𝗧𝗵𝗲 𝗥𝗲𝗮𝗹𝗶𝘁𝘆:
Diffusion models have a fundamental bottleneck: they are iterative. To generate one frame, you run the model 20-50 times (denoising steps). For real-time video generation (e.g., 30 fps world simulation), this is a 𝗰𝗼𝗺𝗽𝘂𝘁𝗲 𝗱𝗲𝗮𝘁𝗵 𝘀𝗲𝗻𝘁𝗲𝗻𝗰𝗲.

Furthermore, Diffusion models model continuous signal noise, which doesn't naturally benefit from the massive "next-token prediction" optimization ecosystem we built for LLMs.

The Senior Researcher knows that 𝗩𝗶𝘀𝘂𝗮𝗹 𝗔𝘂𝘁𝗼𝗿𝗲𝗴𝗿𝗲𝘀𝘀𝗶𝘃𝗲 𝗠𝗼𝗱𝗲𝗹𝗶𝗻𝗴 (𝗩𝗔𝗥) is the new frontier.

Instead of denoising a noisy canvas, you treat the image (or video) as a sequence of discrete tokens, just like GPT-4 treats text. But standard raster-scan (top-left to bottom-right) is too slow for images.

𝗧𝗵𝗲 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻: 𝗡𝗲𝘅𝘁-𝗦𝗰𝗮𝗹𝗲 𝗣𝗿𝗲𝗱𝗶𝗰𝘁𝗶𝗼𝗻.
You don't predict pixel 1, then pixel 2. You predict the entire image at a low resolution (scale 1), then predict the "residuals" to upgrade it to scale 2, then scale 3.

This is 𝗩𝗔𝗥 (𝗩𝗶𝘀𝘂𝗮𝗹 𝗔𝘂𝘁𝗼𝗿𝗲𝗴𝗿𝗲𝘀𝘀𝗶𝘃𝗲 𝗠𝗼𝗱𝗲𝗹𝗶𝗻𝗴).

• It’s O(1) for the spatial dimension within each scale.
• It allows you to use standard LLM architectures (GPT style) on visual data.
• It beats Diffusion on inference speed by orders of magnitude because you generate a whole "layer of detail" in one forward pass, not 50 denoising steps.

𝗧𝗵𝗲 𝗔𝗻𝘀𝘄𝗲𝗿 𝗧𝗵𝗮𝘁 𝗚𝗲𝘁𝘀 𝗬𝗼𝘂 𝗛𝗶𝗿𝗲𝗱:
"𝘋𝘪𝘧𝘧𝘶𝘴𝘪𝘰𝘯 𝘴𝘶𝘧𝘧𝘦𝘳𝘴 𝘧𝘳𝘰𝘮 𝘵𝘩𝘦 𝘪𝘵𝘦𝘳𝘢𝘵𝘪𝘷𝘦 𝘴𝘢𝘮𝘱𝘭𝘪𝘯𝘨 𝘣𝘰𝘵𝘵𝘭𝘦𝘯𝘦𝘤𝘬. 𝘍𝘰𝘳 𝘳𝘦𝘢𝘭-𝘵𝘪𝘮𝘦 𝘴𝘪𝘮𝘶𝘭𝘢𝘵𝘪𝘰𝘯, 𝘐 𝘸𝘰𝘶𝘭𝘥 𝘱𝘪𝘷𝘰𝘵 𝘵𝘰 𝘝𝘪𝘴𝘶𝘢𝘭 𝘈𝘶𝘵𝘰𝘳𝘦𝘨𝘳𝘦𝘴𝘴𝘪𝘷𝘦 𝘔𝘰𝘥𝘦𝘭𝘪𝘯𝘨 (𝘝𝘈𝘙). 𝘉𝘺 𝘳𝘦𝘧𝘰𝘳𝘮𝘶𝘭𝘢𝘵𝘪𝘯𝘨 𝘨𝘦𝘯𝘦𝘳𝘢𝘵𝘪𝘰𝘯 𝘢𝘴 '𝘯𝘦𝘹𝘵-𝘴𝘤𝘢𝘭𝘦 𝘱𝘳𝘦𝘥𝘪𝘤𝘵𝘪𝘰𝘯' 𝘳𝘢𝘵𝘩𝘦𝘳 𝘵𝘩𝘢𝘯 '𝘯𝘦𝘹𝘵-𝘵𝘰𝘬𝘦𝘯' 𝘰𝘳 '𝘥𝘦𝘯𝘰𝘪𝘴𝘪𝘯𝘨', 𝘸𝘦 𝘤𝘢𝘯 𝘭𝘦𝘷𝘦𝘳𝘢𝘨𝘦 𝘻𝘦𝘳𝘰-𝘴𝘩𝘰𝘵 𝘨𝘦𝘯𝘦𝘳𝘢𝘭𝘪𝘻𝘢𝘵𝘪𝘰𝘯 𝘢𝘯𝘥 𝘓𝘓𝘔 𝘴𝘤𝘢𝘭𝘢𝘣𝘪𝘭𝘪𝘵𝘺 𝘸𝘩𝘪𝘭𝘦 𝘢𝘤𝘩𝘪𝘦𝘷𝘪𝘯𝘨 >20𝘹 𝘧𝘢𝘴𝘵𝘦𝘳 𝘪𝘯𝘧𝘦𝘳𝘦𝘯𝘤𝘦 𝘵𝘩𝘢𝘯 𝘋𝘪𝘛𝘴."
