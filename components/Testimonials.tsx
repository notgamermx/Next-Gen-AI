import React from 'react';

const testimonials = [
  {
    quote: "This AI platform has revolutionized our data analysis. We're making smarter decisions faster than ever before. It's an indispensable tool for our team.",
    name: "Jane Doe",
    role: "CTO, Innovate Corp",
    image: "https://picsum.photos/seed/jane/100/100"
  },
  {
    quote: "The seamless integration was a game-changer. We had it running with our existing tools in hours, not weeks. The efficiency gains are incredible.",
    name: "John Smith",
    role: "Head of Analytics, DataDriven Co.",
    image: "https://picsum.photos/seed/john/100/100"
  },
  {
    quote: "The predictive insights are stunningly accurate. We've been able to get ahead of market trends and optimize our strategy with confidence.",
    name: "Emily White",
    role: "CEO, FutureTech Solutions",
    image: "https://picsum.photos/seed/emily/100/100"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-brand-dark relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-400">See how our AI is transforming businesses and driving success for companies around the globe.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-brand-card p-8 rounded-xl border border-white/5">
              <p className="text-gray-300 italic mb-8 text-sm leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full border border-brand-purple/50" />
                <div>
                  <h4 className="font-bold text-sm text-white">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;