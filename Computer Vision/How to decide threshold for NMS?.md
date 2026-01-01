𝙏𝙝𝙚 𝙉𝙈𝙎 𝙏𝙪𝙣𝙞𝙣𝙜 𝙃𝙚𝙡𝙡 𝙏𝙧𝙖𝙥 🔥

You're in a Computer Vision interview at Tesla The interviewer asks:

"𝘖𝘶𝘳 𝘰𝘣𝘫𝘦𝘤𝘵 𝘥𝘦𝘵𝘦𝘤𝘵𝘰𝘳 𝘧𝘪𝘯𝘥𝘴 𝘵𝘩𝘦 𝘤𝘢𝘳𝘴, 𝘣𝘶𝘵 𝘪𝘵 𝘰𝘶𝘵𝘱𝘶𝘵𝘴 5 𝘰𝘷𝘦𝘳𝘭𝘢𝘱𝘱𝘪𝘯𝘨 𝘣𝘰𝘹𝘦𝘴 𝘧𝘰𝘳 𝘦𝘷𝘦𝘳𝘺 𝘴𝘪𝘯𝘨𝘭𝘦 𝘤𝘢𝘳. 𝘞𝘦 𝘵𝘶𝘯𝘦𝘥 𝘵𝘩𝘦 𝘕𝘰𝘯-𝘔𝘢𝘹𝘪𝘮𝘶𝘮 𝘚𝘶𝘱𝘱𝘳𝘦𝘴𝘴𝘪𝘰𝘯 (𝘕𝘔𝘚) 𝘵𝘩𝘳𝘦𝘴𝘩𝘰𝘭𝘥, 𝘣𝘶𝘵 𝘯𝘰𝘸 𝘪𝘵 𝘥𝘦𝘭𝘦𝘵𝘦𝘴 𝘷𝘢𝘭𝘪𝘥 𝘤𝘢𝘳𝘴 𝘵𝘩𝘢𝘵 𝘢𝘳𝘦 𝘱𝘢𝘳𝘬𝘦𝘥 𝘤𝘭𝘰𝘴𝘦 𝘵𝘰𝘨𝘦𝘵𝘩𝘦𝘳. 𝘏𝘰𝘸 𝘥𝘰 𝘸𝘦 𝘧𝘪𝘹 𝘵𝘩𝘦 𝘵𝘩𝘳𝘦𝘴𝘩𝘰𝘭𝘥?"

🕸️ 90% of candidates walk right into the trap.

They say: "𝘠𝘰𝘶 𝘯𝘦𝘦𝘥 𝘢 '𝘚𝘰𝘧𝘵-𝘕𝘔𝘚' 𝘰𝘳 𝘢𝘯 𝘢𝘥𝘢𝘱𝘵𝘪𝘷𝘦 𝘵𝘩𝘳𝘦𝘴𝘩𝘰𝘭𝘥 𝘣𝘢𝘴𝘦𝘥 𝘰𝘯 𝘥𝘦𝘯𝘴𝘪𝘵𝘺."

They just signed up for a lifetime of heuristic tuning.

The Reality: NMS is a Heuristic Hack.

NMS assumes that "overlapping boxes = duplicate detections." In dense scenes (crowds, parking lots), this assumption breaks. A car blocking another car 𝘴𝘩𝘰𝘶𝘭𝘥 have an overlapping box. NMS mathematically cannot distinguish between "duplicate prediction" and "occluded object." You are fighting the limitations of the post-processing, not the model.

✅ The Solution: Stop removing boxes. Start predicting Sets.

The senior solution is to move to 𝗘𝗻𝗱-𝘁𝗼-𝗘𝗻𝗱 𝗢𝗯𝗷𝗲𝗰𝘁 𝗗𝗲𝘁𝗲𝗰𝘁𝗶𝗼𝗻 (𝗗𝗘𝗧𝗥).

• Set Prediction: Instead of predicting thousands of candidate boxes and filtering them, the Transformer predicts a fixed set of N objects directly.
• Bipartite Matching: During training, it uses a Hungarian Loss to assign one predicted box to one ground-truth object uniquely.
• The model 𝘭𝘦𝘢𝘳𝘯𝘴 to not output duplicates. It learns that "two boxes on the same car increases loss."
 

✍️ 𝗧𝗵𝗲 𝗔𝗻𝘀𝘄𝗲𝗿 𝗧𝗵𝗮𝘁 𝗚𝗲𝘁𝘀 𝗬𝗼𝘂 𝗛𝗶𝗿𝗲𝗱:
"𝘐 𝘸𝘰𝘶𝘭𝘥𝘯'𝘵 𝘵𝘶𝘯𝘦 𝘵𝘩𝘦 𝘕𝘔𝘚. 𝘕𝘔𝘚 𝘪𝘴 𝘢 𝘣𝘰𝘵𝘵𝘭𝘦𝘯𝘦𝘤𝘬 𝘵𝘩𝘢𝘵 𝘧𝘢𝘪𝘭𝘴 𝘪𝘯 𝘥𝘦𝘯𝘴𝘦 𝘰𝘤𝘤𝘭𝘶𝘴𝘪𝘰𝘯. 𝘐 𝘸𝘰𝘶𝘭𝘥 𝘴𝘸𝘪𝘵𝘤𝘩 𝘵𝘰 𝘢 𝘛𝘳𝘢𝘯𝘴𝘧𝘰𝘳𝘮𝘦𝘳-𝘣𝘢𝘴𝘦𝘥 𝘢𝘳𝘤𝘩𝘪𝘵𝘦𝘤𝘵𝘶𝘳𝘦 𝘭𝘪𝘬𝘦 𝘋𝘌𝘛𝘙 𝘵𝘩𝘢𝘵 𝘶𝘴𝘦𝘴 𝘣𝘪𝘱𝘢𝘳𝘵𝘪𝘵𝘦 𝘮𝘢𝘵𝘤𝘩𝘪𝘯𝘨 𝘭𝘰𝘴𝘴. 𝘛𝘩𝘪𝘴 𝘧𝘰𝘳𝘤𝘦𝘴 𝘵𝘩𝘦 𝘮𝘰𝘥𝘦𝘭 𝘵𝘰 𝘭𝘦𝘢𝘳𝘯 𝘰𝘯𝘦-𝘵𝘰-𝘰𝘯𝘦 𝘢𝘴𝘴𝘪𝘨𝘯𝘮𝘦𝘯𝘵, 𝘦𝘭𝘪𝘮𝘪𝘯𝘢𝘵𝘪𝘯𝘨 𝘥𝘶𝘱𝘭𝘪𝘤𝘢𝘵𝘦 𝘱𝘳𝘦𝘥𝘪𝘤𝘵𝘪𝘰𝘯𝘴 𝘢𝘯𝘥 𝘵𝘩𝘦 𝘯𝘦𝘦𝘥 𝘧𝘰𝘳 𝘕𝘔𝘚 𝘦𝘯𝘵𝘪𝘳𝘦𝘭𝘺."
