import React, { Component } from "react";
import "./nominations.style.scss";
class Nominations extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate = (prevProps, nextProps) => {
    if (this.props.nominations !== prevProps.nominations) {
      localStorage.setItem(
        "Nomination",
        JSON.stringify(this.props.nominations)
      );
    }
    return false;
  };

  deletingItem = (item) => {
    this.props.deleteItem(item);
  };
  removingDisable = (item) => {
    this.props.removeDisable(item);
  };

  render() {
    const { nominations } = this.props;

    return (
      <div id="nom" className="nominations">
        {nominations &&
          nominations.map((item) => {
            return (
              <div
                className="card mt-3 text-center "
                style={{ height: "5rem" }}
                key={item.id}
              >
                <div className="d-flex justify-content-between">
                  <div className="card-title ml-3 mt-3 text-info d">
                    <h4>
                      {item.title} ({item.year}){" "}
                    </h4>
                  </div>
                  <div className="d-flex justify-content-between ">
                    <span
                      aria-hidden="true"
                      key={item.id}
                      onClick={() => {
                        this.deletingItem(item.id);
                        this.removingDisable(item.id);
                      }}
                      className="mr-3 close mt-2"
                    >
                      &times;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Nominations;
