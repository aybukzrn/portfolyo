import TypingAnimation from "./TypingAnimation";

export default function Hero() {
    const introText = `Merhaba,\nben\nAybüke`;
    const subtitleText =
        "Modern web arayüzleri geliştiriyorum.\nBurada projelerimi, deneyimlerimi ve becerilerimi bulabilirsiniz.";

    const introDuration = 90;
    const subtitleDelay = introText.length * introDuration + 500;

    return (
        <div className="relative min-h-screen flex flex-col gap-8 justify-center items-center p-12 bg-transparent">
            <div className="flex flex-col min-w-full">
                <div className="p-12 shadow-b-lg shadow-white/20 rounded-lg text-center">
                    <TypingAnimation
                        className="font-sansation text-7xl lg:text-8xl text-white whitespace-pre-line"
                        duration={introDuration}
                        hideCursorWhenDone
                    >
                        {introText}
                    </TypingAnimation>

                    <TypingAnimation
                        className="text-gray-300 font-light mt-10 text-2xl whitespace-pre-line"
                        duration={50}
                        delay={subtitleDelay}
                    >
                        {subtitleText}
                    </TypingAnimation>
                </div>

            </div>

            <div className="pointer-events-none absolute bottom-18 left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center gap-2 text-white/70 text-xs">
                    <span className="uppercase tracking-[0.2em] text-[10px]">
                        Scroll
                    </span>
                    <div className="h-8 w-5 rounded-full border border-white/60 flex items-start justify-center py-1 animate-bounce">
                        <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                    </div>
                </div>
            </div>
        </div>
    );
}