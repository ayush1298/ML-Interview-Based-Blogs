How to make Diffusion model Faster at inference.

First up: Change your data type.
PyTorch loads models in float32 by default. Switch to bfloat16 for instant speedups with minimal effort.
pythonpipeline = StableDiffusionXLPipeline.from_pretrained(
 "model-name", 
 torch_dtype=torch.bfloat16
).to("cuda")

Enable Scaled Dot Product Attention (SDPA).
If you're on PyTorch 2.0+, this is already on by default! SDPA automatically picks the fastest attention backend for your hardware - FlashAttention, xFormers, or native C++.

Zero code changes needed. 

torch.compile is your secret weapon.

Set these configs for maximum speed:

mode="max-autotune"
fullgraph=True
memory_format=channels_last

Compile your UNet and VAE. First run is slow, but subsequent runs are significantly faster.

Pro tip: Use dynamic compilation to avoid recompilation hell.
Add dynamic=True when compiling to generate more flexible kernels. This prevents recompilation when input shapes change (like different image resolutions).

pythonpipeline.unet = torch.compile(
 pipeline.unet, 
 fullgraph=True, 
 dynamic=True
)


Regional compilation = best of both worlds.
Instead of compiling the entire model, just compile the small repeated blocks (like transformer layers).

You get the same speedup with 8-10x faster compile times.
pythonpipeline.unet.compile_repeated_blocks(fullgraph=True)

Dynamic quantization with torchao.
Apply int8 quantization to reduce precision and enable faster math ops. The scaling adapts to your data at runtime for better accuracy than static quantization.
Easy 20-30% speedup with minimal quality loss.


Stack these techniques together!
The real magic happens when you combine:
✓ bfloat16
✓ torch.compile
✓ SDPA
✓ Dynamic quantization

You can hit 2.5x+ speedups on H100s. Each optimization compounds with the others.

Watch out for graph breaks!
Always use return_dict=False and index outputs directly when using fullgraph=True:
pythonlatents = unet(
 latents, 
 timestep=timestep, 
 encoder_hidden_states=prompt_embeds, 
 return_dict=False
)[0]
