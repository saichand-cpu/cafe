"use client";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroScene=dynamic(()=>import("../components/HeroScene"),{ssr:false,loading:()=>null});

const dishes=[
 {emoji:"☕",name:"FORGE ESPRESSO",desc:"Intense Italian roast · rich crema",price:"₹180"},
 {emoji:"◉",name:"FORGE SIGNATURE",desc:"Espresso · orange peel · smoked vanilla",price:"₹280"},
 {emoji:"🍝",name:"TRUFFLE PASTA",desc:"Fresh pasta · black truffle · parmigiano",price:"₹690"},
 {emoji:"◌",name:"BURRATA",desc:"Creamy burrata · tomatoes · basil oil",price:"₹520"},
 {emoji:"🍰",name:"TIRAMISÙ",desc:"Espresso · mascarpone · cocoa",price:"₹320"},
 {emoji:"✦",name:"SPARKLING CITRUS",desc:"Blood orange · rosemary · soda",price:"₹260"},
];

function Reveal({children,delay=0}:{children:React.ReactNode;delay?:number}){
 return <motion.div initial={{opacity:0,y:70,filter:"blur(12px)"}} whileInView={{opacity:1,y:0,filter:"blur(0px)"}} viewport={{once:true,margin:"-100px"}} transition={{duration:.9,delay,ease:[.16,1,.3,1]}}>{children}</motion.div>;
}

function Magnetic({children,href}:{children:React.ReactNode;href:string}){
 return <motion.a href={href} className="button magnetic" whileHover={{scale:1.04}} whileTap={{scale:.97}}>{children}</motion.a>;
}

export default function Home(){
 const heroRef=useRef<HTMLElement>(null);
 const {scrollYProgress}=useScroll({target:heroRef,offset:["start start","end start"]});
 const titleY=useTransform(scrollYProgress,[0,1],[0,-160]);
 const titleScale=useTransform(scrollYProgress,[0,1],[1,.82]);
 const opacity=useTransform(scrollYProgress,[0,.7],[1,0]);
 return <main className="site">
  <nav className="nav"><a href="#top" className="brand">FORGE ITALY</a><div className="navlinks"><a href="#menu">Menu</a><a href="#story">Story</a><a href="#experience">Experience</a></div><Magnetic href="/reservations">Reserve ↗</Magnetic></nav>

  <section className="hero" id="top" ref={heroRef}>
    <HeroScene/><div className="heroShade"/>
    <motion.div className="heroContent" style={{y:titleY,scale:titleScale,opacity}}>
      <div className="eyebrow">Italian coffee · Hyderabad · 17.40° N</div>
      <h1 className="heroTitle"><span>FORGE</span><span>ITALY</span></h1>
      <p className="heroSub">Crafted by fire. Inspired by Italy. A cinematic café experience built around coffee, food, design and the art of slowing down.</p>
      <div className="heroCtas"><Magnetic href="#menu">Explore menu →</Magnetic><Magnetic href="/reservations">Reserve a table</Magnetic></div>
    </motion.div>
    <div className="scrollHint"><span className="scrollLine"/>Scroll to enter the forge</div>
  </section>

  <section className="marquee"><div className="marqueeTrack">ESPRESSO · PASTA · DOLCE · APERITIVO · FORGE ITALY · ESPRESSO · PASTA · DOLCE · APERITIVO ·</div></section>

  <section className="section dark forgeSection" id="experience"><div className="forgeGrid"><Reveal><div><div className="kicker">01 / The Forge</div><h2 className="display">Everything<br/>starts with fire.</h2><p className="body">At FORGE ITALY, coffee is not simply prepared. It is crafted — with heat, patience and an obsession for character. The room, the roast and every plate are part of the same ritual.</p></div></Reveal><div className="forgeOrbWrap"><div className="forgeOrb"><span className="orbCore"/><span className="orbRing r1"/><span className="orbRing r2"/></div></div></div></section>

  <section className="section coffeeScene"><div className="sceneLabel">02 / The ritual</div><div className="coffeeCopy"><Reveal><h2 className="display">A small cup.<br/><em>A whole world.</em></h2><p className="body">Roasted for depth, poured with precision and served without hurry. The first sip should make the room disappear.</p></Reveal></div><div className="coffeeRings"><i/><i/><i/><span>ESPRESSO<br/><small>single origin · 30 ml</small></span></div></section>

  <section className="section menuSection" id="menu"><div className="menuIntro"><Reveal><div className="kicker">03 / The menu</div><h2 className="display">Made to linger over.</h2><p className="body">Italian classics, signature coffee and late-night favourites. Designed for long conversations and one more round.</p></Reveal></div><div className="menuGrid">{dishes.map((d,i)=><Reveal key={d.name} delay={i*.06}><motion.article className="dish" whileHover={{y:-12,rotateX:2,rotateY:i%2?1:-1}}><div className="dishVisual"><span>{d.emoji}</span><div className="dishGlow"/></div><div className="dishMeta"><span>0{i+1}</span><strong>{d.price}</strong></div><h3>{d.name}</h3><p>{d.desc}</p></motion.article></Reveal>)}</div><div className="centerCta"><Magnetic href="/menu">View full menu →</Magnetic></div></section>

  <section className="fullBleed"><div className="fullBleedNoise"/><div className="fullBleedText"><div className="kicker">04 / The Italian moment</div><div className="storyWords"><span>Slow.</span><span>Sit.</span><span>Sip.</span><span>Stay.</span></div></div></section>

  <section className="section story" id="story"><Reveal><div className="storyGrid"><div><div className="kicker">05 / Our story</div><h2 className="display">Not a café.<br/><em>A state of mind.</em></h2></div><p className="body">FORGE ITALY is a place for the moments between destinations — the first espresso of the morning, an unplanned dessert, an evening that runs longer than expected. Italian hospitality, Hyderabad energy, and a little more time than you planned to give yourself.</p></div></Reveal></section>

  <section className="section reservation" id="reserve"><div className="reservationGlow"/><Reveal><div className="kicker">06 / Your table</div><h2 className="display">Your table<br/><em>is waiting.</em></h2><p className="body">Choose your moment. We will take care of the rest.</p><div className="centerCta"><Magnetic href="/reservations">Reserve a table →</Magnetic></div></Reveal></section>

  <footer className="footer"><div><div className="footerBrand">FORGE ITALY</div><div className="footerTag">Crafted by fire. Inspired by Italy.</div><div className="demoContact">Demo contact · Via del Ferro 21, Hyderabad · +91 90000 00000</div></div><div className="footerLinks"><a href="/menu">Menu</a><a href="/story">Story</a><a href="/gallery">Gallery</a><a href="/contact">Contact</a><a href="/reservations">Reservations</a></div></footer>
 </main>
}
