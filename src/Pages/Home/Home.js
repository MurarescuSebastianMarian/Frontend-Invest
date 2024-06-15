import './Home.css';

const Home = () => {
  return (
    <div className="Home">
      <div className="HomeContainer">
        <div className="HomeFirst">
          <div className="HomeFirst_Left">
            <div className="HomeFirst_Left_Title">
              Title
            </div>
            <div className="HomeFirst_Left_Content">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
              a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </div>
          <div className="HomeFirst_Right">
            <img src='https://croitoriacuti.ro/images/design.png' alt="img1"/>
          </div>
        </div>
        <div className="HomeSecond">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </div>
    </div>
  );
}

export default Home;
