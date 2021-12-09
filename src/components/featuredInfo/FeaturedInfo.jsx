import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./featuredInfo.css";
export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);
  console.log("income", income);
  console.log("perc", perc);
  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="featuredTitle">Revanue</div>
        <div className="featuredMonyContainer">
          <span className="featuredMony">${income[1]?.total}</span>
          <span className="featuredMonyRate">
            %{Math.floor(perc)}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <div className="featuredTitle">Sales</div>
        <div className="featuredMonyContainer">
          <span className="featuredMony">$4415</span>
          <span className="featuredMonyRate">
            -1.4 <ArrowDownward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <div className="featuredTitle">Const</div>
        <div className="featuredMonyContainer">
          <span className="featuredMony">$2015</span>
          <span className="featuredMonyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
