import "./Plans.scss";
import Plan from "../components/Plan";

const Plans = () => {
  return (
    <section className="plans__section">
      <aside className="plans__info">
        <p className="plans__info--duration">
          <span className="plans__info--active">Monthly</span>
          <span>Yearly</span>
        </p>
        <ul className="features__list">
          <li className="features__list--item">Monthly Price</li>
          <li className="features__list--item">Video Quality</li>
          <li className="features__list--item">Resolution</li>
          <li className="features__list--item">Devices you can use to watch</li>
        </ul>
      </aside>
      <Plan />
      <Plan />
      <Plan />
      <Plan />
    </section>
  );
};

export default Plans;
