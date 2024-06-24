import './Home.css';
import myImage from '../../Assets/img/stock-market-chart.jpg';

const Home = () => {
  return (
    <div className="Home">
      <div className="HomeContainer">
        <div className="HomeFirst">
          <div className="HomeFirst_Left">
            <div className="HomeFirst_Left_Title">
              Bine ați venit la  Investment Advisor
            </div>
            <div className="HomeFirst_Left_Content">
            Investiții Inteligente. Viitor Prosper.
            Descoperă o nouă eră a investițiilor cu Investment Advisor, platforma ta de încredere pentru gestionarea inteligentă a finanțelor. Fie că ești un investitor începător sau un profesionist experimentat, aplicația noastră este concepută să îți ofere instrumentele și resursele necesare pentru a-ți maximiza profitul și a-ți securiza viitorul financiar.
            </div>
          </div>
          <div className="HomeFirst_Right">
            <img src={myImage} alt="img1"/>
          </div>
        </div>
        <div className="HomeSecond">
          Caracteristicile Noastre
          Analize Detaliate: Beneficiază de rapoarte și analize de piață în timp real, astfel încât să poți lua decizii informate.
          Portofoliu Personalizat: Creează și gestionează portofolii personalizate adaptate obiectivelor tale financiare.
          Siguranță și Securitate: Ne angajăm să îți protejăm datele și investițiile cu cele mai avansate tehnologii de securitate.
          Îndrumare Profesională: Accesează sfaturi și strategii de la experți financiari pentru a-ți optimiza investițiile.
          Platformă Intuitivă: Interfața noastră user-friendly îți permite să navighezi și să operezi cu ușurință, chiar și fără experiență prealabilă.
          Începe să Investești Astăzi
          Nu a fost niciodată mai ușor să începi să investești. Creează-ți un cont în câteva minute și pornește pe drumul spre independența financiară. Cu Investment Advisor, ai la dispoziție toate instrumentele de care ai nevoie pentru a-ți transforma visurile în realitate.
        </div>
        <div className="HomeSecond">
          De Ce Investment Advisor?
          Tehnologie Avansată: Folosim cele mai noi tehnologii pentru a-ți oferi cea mai bună experiență.
          Asistență Non-Stop: Echipa noastră de suport este disponibilă 24/7 pentru a te ajuta cu orice întrebare sau problemă.
          Începe astăzi cu Investment Advisor și investește în viitorul tău!
        </div>
      </div>
    </div>
  );
}

export default Home;
