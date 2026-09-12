"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroScene=dynamic(()=>import("../components/HeroScene"),{ssr:false,loading:()=>null});

const dishes=[
 {emoji:"☕",name:"FORGE ESPRESSO",desc:"Intense Italian roast · rich crema",price:"₹180"},
 {emoji:"🍝",name:"TRUFFLE PASTA",desc:"Fresh pasta · black truffle · parmigiano",price:"₹690"},
 {emoji:"🍰",name:"TIRAMISÙ",desc:"Espresso · mascarpone · cocoa",price:"₹320"},
];

export default function Home(){
 return <main className="site">
  <nav className="nav"><a href="#top" className="brand">FORGE ITALY</a><div className="navlinks"><a href="#menu">Menu</a><a href="#story">Story</a><a href="#experience">Experience</a></div><a href="#reserve" className="reserve">Reserve ↗</a></nav>
  <section className="hero" id="top"><HeroScene/><div className="heroShade"/><div className="heroContent"><div className="eyebrow">Italian coffee · Hyderabad</div><h1 className="heroTitle"><span>FORGE</span><span>ITALY</span></h1><p className="heroSub">Crafted by fire. Inspired by Italy. A cinematic café experience built around coffee, food, design and the art of slowing down.</p><div className="heroCtas"><a className="button primary" href="#menu">Explore menu →</a><a className="button" href="#reserve">Reserve a table</a></div></div><div className="scrollHint">Scroll to enter the forge ↓</div></section>
  <section className="section dark" id="experience"><div className="forgeGrid"><div><div className="kicker">01 / The Forge</div><h2 className="display">Everything<br/>starts with fire.</h2><p className="body">At FORGE ITALY, coffee is not simply prepared. It is crafted — with heat, patience and an obsession for character. The room, the roast and every plate are part of the same ritual.</p></div><motion.div className="forgeOrb" animate={{scale:[1,1.03,1],boxShadow:["0 0 80px #d46a3520","0 0 130px #d46a3540","0 0 80px #d46a3520"]}} transition={{duration:4,repeat:Infinity}}/></div></section>
  <section className="section" id="menu"><div className="menuIntro"><div className="kicker">02 / The menu</div><h2 className="display">Made to linger over.</h2><p className="body" style={{margin:"0 auto"}}>Italian classics, signature coffee and late-night favourites. Designed for long conversations and one more round.</p></div><div className="menuGrid">{dishes.map((d,i)=><motion.article className="dish" key={d.name} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{delay:i*.08}}><div className="dishVisual">{d.emoji}</div><h3>{d.name}</h3><p>{d.desc}</p><strong>{d.price}</strong></motion.article>)}</div><div style={{textAlign:"center",marginTop:45}}><a className="button" href="/menu">View full menu →</a></div></section>
  <section className="section story" id="story"><div><div className="kicker">03 / The Italian moment</div><div className="storyWords"><span>Slow.</span><span>Sit.</span><span>Sip.</span><span>Stay.</span></div><p className="body" style={{marginTop:50}}>FORGE ITALY is a place for the moments between destinations — the first espresso of the morning, an unplanned dessert, an evening that runs longer than expected.</p></div></section>
  <section className="section reservation" id="reserve"><div className="kicker">04 / Your table</div><h2 className="display">Your table is waiting.</h2><p className="body" style={{margin:"0 auto 35px"}}>Choose your moment. We will take care of the rest.</p><a className="button primary" href="/reservations">Reserve a table →</a></section>
  <footer className="footer"><div><div className="footerBrand">FORGE ITALY</div><div style={{color:"#b9ab97",fontSize:11,marginTop:8}}>Crafted by fire. Inspired by Italy.</div></div><div className="footerLinks"><a href="/menu">Menu</a><a href="/story">Story</a><a href="/gallery">Gallery</a><a href="/contact">Contact</a></div></footer>
 </main>
}
