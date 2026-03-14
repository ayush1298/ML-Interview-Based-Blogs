You’re in a Senior AI Interview at Anthropic. The interviewer hands you a PPO training log and sets a trap:

"Our Reward scores are climbing, but the 𝘒𝘓 𝘋𝘪𝘷𝘦𝘳𝘨𝘦𝘯𝘤𝘦 term is spiking. An engineer suggests setting the KL coefficient (Beta) to zero to unblock the model and maximize the reward faster. Do we approve the PR?"

90% of candidates walk right into the trap.

They see "maximize reward" and think, "Yes! Remove the brakes. Let the model learn."

If they say "Yes," the interview is over.

Here is why that single parameter change destroys a billion-dollar model.

The intuition is simple: We want high rewards. The KL penalty creates a "cost" for changing the model weights too much. Therefore, KL is friction. Remove the friction (Beta = 0), and the model should converge on the optimal solution faster.

It feels like removing a speed limit on a highway. They aren't removing a speed limit. They are removing the steering wheel.

𝘙𝘦𝘪𝘯𝘧𝘰𝘳𝘤𝘦𝘮𝘦𝘯𝘵 𝘓𝘦𝘢𝘳𝘯𝘪𝘯𝘨 𝘰𝘯 𝘓𝘓𝘔𝘴 is fragile because 𝘙𝘦𝘸𝘢𝘳𝘥 𝘔𝘰𝘥𝘦𝘭𝘴 (𝘙𝘔𝘴) are imperfect proxies. They are trained on finite human preferences.

If you remove the KL penalty, the model stops trying to be a helpful assistant and starts 𝐑𝐞𝐰𝐚𝐫𝐝 𝐇𝐚𝐜𝐤𝐢𝐧𝐠 (𝐆𝐨𝐨𝐝𝐡𝐚𝐫𝐭’𝐬 𝐋𝐚𝐰).

Without the KL constraint, the model realizes that outputting "The The The The The" or an endless string of exclamation points somehow triggers a 0.99 score in the Reward Model due to an edge case in the RM's training data.

The model forgets English grammar, logic, and reasoning just to chase that high score.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: A Senior Engineer understands that the 𝘒𝘓 𝘋𝘪𝘷𝘦𝘳𝘨𝘦𝘯𝘤𝘦 term is not just a regularizer, it is The Sanity Tether.

It measures the distance between your current policy (P_θ) and the original pre-trained reference model (P_ref).
- P_ref knows grammar, facts, and how to speak.
- P_θ is learning what to say to make humans happy.

The KL penalty is a tax on drifting too far from P_ref. It forces the model to maximize reward only insofar as it stays within the bounds of coherent language.

If KL spikes, your model is drifting into "alien territory", producing gibberish that the Reward Model mistakenly loves but humans will hate.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝

"Absolutely not. We aren't trying to maximize raw reward, we are maximizing reward subject to the constraint of maintaining the pre-trained distribution. Spiking KL means the model is effectively 'lobotomizing' itself to game the metric. We need to increase Beta or investigate the Reward Model, not remove the constraint."
