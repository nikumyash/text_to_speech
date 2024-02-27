import { Button } from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link";
import Tts from "@/components/Tts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="w-full max-w-7xl mx-auto h-full">
        <nav className="flex justify-between px-8 w-full my-6">
          <Link href={"/"} className="text-4xl flex items-center justify-center font-semibold tracking-tight">
            <Image src={"/logo.png"} height={64} width={64} alt={"Joice logo"} />
            <p className="hidden md:block">Joice</p>
          </Link>
          <div className="flex items-center gap-4 justify-center">
            <Button asChild className="p-2">
              <Link href={"https://github.com/nikumyash/text_to_speech"}>
                <Image src={"/github.png"} width={24} height={24} alt="Github"></Image>
              </Link>
            </Button>
            <Link className="hidden md:block" href={"https://nikumyash.in"}>
              @nikumyash
            </Link>
          </div>
        </nav>
        <section className="w-full flex px-2 flex-col my-24 items-center justify-center">
          <h3 className="font-extrabold text-2xl md:text-5xl text-center max-w-2xl">
            Simple and easy to use <span className="text-blue-500">Text to Speech Converter</span>
          </h3>
          <p className="text-md md:text-2xl my-2">powered By Hugging Face<Image className="inline" src={"/huggingface.png"} height={40} width={40} alt={"Huggingface logo"} /></p>
        </section>
        <Tts/>
      </section>
      <footer className="text-center">
        Text to speech conversion is possible thanks to <Link href={"https://huggingface.co/Voicemod/fastspeech2-en-male1"}>Voicemod/fastspeech2-en-male1</Link>
      </footer>
    </main>
  );
}
