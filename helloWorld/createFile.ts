const encoder = new TextEncoder();

const greetText = encoder.encode("Hi!\nMy name is Mauricio");

// Top level await in deno (no function needed)
await Deno.writeFile("greet.txt", greetText);