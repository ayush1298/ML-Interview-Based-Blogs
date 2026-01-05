You're in a Senior Computer Vision interview at Google and the interviewer asks:

"We’re building a similarity search for a new dataset. If I arbitrarily rotate the feature space by 45 degrees, which distance metric falls apart: 𝐋1 𝐨𝐫 𝐋2? And what does that tell you about our feature engineering strategy?"

Most of candidates say: "Well, 𝐋1 (𝐌𝐚𝐧𝐡𝐚𝐭𝐭𝐚𝐧) is good for sparse data like text, and 𝐋2 (𝐄𝐮𝐜𝐥𝐢𝐝𝐞𝐚𝐧) is standard for images. Rotation shouldn't really change the distances much."

The reality is that this answer fails the geometry check. If they say this, they have just proven they treat hyperparameters like magic numbers rather than geometric tools.

The key concept here is 𝐂𝐨𝐨𝐫𝐝𝐢𝐧𝐚𝐭𝐞 𝐃𝐞𝐩𝐞𝐧𝐝𝐞𝐧𝐜𝐞. The interviewer is testing if they understand the geometry of their error surface. Here is the breakdown:

1️⃣ 𝐋2 (𝐄𝐮𝐜𝐥𝐢𝐝𝐞𝐚𝐧) 𝐢𝐬 𝐑𝐨𝐭𝐚𝐭𝐢𝐨𝐧𝐚𝐥𝐥𝐲 𝐈𝐧𝐯𝐚𝐫𝐢𝐚𝐧𝐭.
Think of a circle. If you spin a circle, it looks exactly the same. The distance between two points "as the crow flies" doesn't change just because you tilted your head (or the axes).

2️⃣ 𝐋1 (𝐌𝐚𝐧𝐡𝐚𝐭𝐭𝐚𝐧) 𝐢𝐬 𝐂𝐨𝐨𝐫𝐝𝐢𝐧𝐚𝐭𝐞 𝐃𝐞𝐩𝐞𝐧𝐝𝐞𝐧𝐭.
Think of a square (or diamond) aligned to the X and Y axes. If you rotate your data points, the L1 distance between them changes.

Why this breaks production models: If you use L1, you are implicitly stating that your axes have special semantic meaning.

- 𝘌𝘹𝘢𝘮𝘱𝘭𝘦: If Feature A is "Age" and Feature B is "Salary," these are distinct, non-interchangeable concepts. Moving along the "Age" axis is fundamentally different than moving along the "Salary" axis. L1 respects this grid.

- 𝘛𝘩𝘦 𝘛𝘳𝘢𝘱: If you run PCA (Principal Component Analysis) which rotates your features, or if your features are arbitrary (like raw pixel values), L1 becomes unstable. You are enforcing a grid structure on data that no longer aligns with that grid.

𝐓𝐡𝐞 𝐑𝐮𝐥𝐞:
1️⃣ Use L1 only when the specific coordinate axes are meaningful and independent (e.g., tabular business logic).
2️⃣ Use L2 when the direction is arbitrary or physical (e.g., spatial data, vectors where orientation is fluid).

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"L2 is isotropic, it doesn't care about the axes. L1 is anisotropic, it is strictly bound to the coordinate system. I would choose L1 only if the features are individually semantically meaningful. Otherwise, arbitrary rotation will corrupt the metric."
