import "./Loading.scss";
import LoadingSVG from "../assets/loading.svg";

type LoadingProps = {
  active: boolean;
};

export const Loading = ({ active }: LoadingProps) => {
  return active ? (
    <div className="container">
      <img src={LoadingSVG} className="svg" />
    </div>
  ) : null;
};
