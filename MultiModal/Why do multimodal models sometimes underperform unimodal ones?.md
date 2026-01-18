You are in an Apple ML Research interview.

The question:
"Why do multimodal models sometimes underperform unimodal ones?"

You pause.

Most answers mention data imbalance.

You go deeper:
"When different modalities share a representation too early, that space can collapse. One modality can dominate before real abstraction forms."

You explain:
"Vision often anchors meaning strongly. Cross-modal attention can learn shortcuts instead of shared concepts."

They ask.
"How do you prevent that?"

You respond.
"Use modality-specific encoders. Fuse information later. Apply contrastive learning so modalities align without overpowering each other."

One final question.
"What happens if you do not?"

You answer.
"The model appears multimodal but reasons through one modality. Performance looks good until one input degrades. Then failures are silent."

You finish with:
"Multimodality is not about seeing more. It is about reasoning across representations."
