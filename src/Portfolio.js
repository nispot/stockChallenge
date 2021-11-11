import React, { Component } from 'react'
import './Portfolio.css';
import DatePicker from 'react-date-picker'

export default class Portfolio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      results: {
        profit: '',
        annualProfit: '',
        profitRatio: '',
      }
    };
  }

  precision = 100; // 2 decimals
  getPrice = () => Math.floor(Math.random() * (200 * this.precision - 1 * this.precision) + 1 * this.precision) / (1* this.precision);

  portfolio = [
    {
      "company": "3M",
      "description": "3M, based in Minnesota, may be best known for its Scotch tape and Post-It Notes, but it also produces sand paper, adhesives, medical products, computer screen filters, food safety items, stationery products and many products used in automotive, marine, and aircraft industries.",
      "initial_price": 44.28,
      "price": (date) => this.getPrice(), // real price on 2002 :) USD 56.27,
      "symbol": "MMM"
  },
  {
      "company": "Amazon.com",
      "description": "Amazon.com, Inc. is an online retailer in North America and internationally. The company serves consumers through its retail Web sites and focuses on selection, price, and convenience. It also offers programs that enable sellers to sell their products on its Web sites, and their own branded Web sites. In addition, the company serves developer customers through Amazon Web Services, which provides access to technology infrastructure that developers can use to enable virtually various type of business. Further, it manufactures and sells the Kindle e-reader. Founded in 1994 and headquartered in Seattle, Washington.",
      "initial_price": 89.38,
      "price": (date) => this.getPrice(), // real price on 2002 :) USD 17.01,
      "symbol": "AMZN"
  },
  {
      "company": "Campbell Soup",
      "description": "Campbell Soup is a worldwide food company, offering condensed and ready-to-serve soups; broth, stocks, and canned poultry; pasta sauces; Mexican sauces; canned pastas, gravies, and beans; juices and beverages; and tomato juices. Its customers include retail food chains, mass discounters, mass merchandisers, club stores, convenience stores, drug stores and other retail, and commercial and non-commercial establishments. Campbell Soup Company was founded in 1869 and is headquartered in Camden, New Jersey.",
      "initial_price": 37.0,
      "price": (date) => this.getPrice(), // real price on 2002 :) USD 22.27,
      "symbol": "CPB"
  },
  {
      "company": "Disney",
      "description": "The Walt Disney Company, founded in 1923, is a worldwide entertainment company, with movies, cable networks, radio networks, movie production, musical recordings and live stage plays. Disney also operates Walt Disney World in Florida and Disneyland in California, Disney Cruise Line, and international Disney resorts. Disney owns countless licenses and literary properties and publishes books and magazines.",
      "initial_price": 40.68,
      "price": (date) => this.getPrice(), // real price on 2002 :) USD 15.24,
      "symbol": "DIS"
  }
]

  //https://www.investopedia.com/ask/answer/07/portfolio_calculations.asp
  //https://www.investopedia.com/terms/a/annualized-rate.asp
  profit = (startDate, endDate) => {
    
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    
    const sumPricesStartDate = this.portfolio.map ( stock => {
      return stock.price(startDate);
    }).reduce(reducer, 0);

    const sumPricesEndDate = this.portfolio.map ( stock => {
      return stock.price(endDate);
    }).reduce(reducer, 0);
  
    const dateDiff = (startDate, endDate) => {
      const diffTime = Math.abs(endDate - startDate);
      return  Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    }

    const days = dateDiff(startDate, endDate); 
  
    return {
      profit: `USD ${(sumPricesEndDate - sumPricesStartDate).toFixed(2)}`,
      annualProfit: `${(((sumPricesStartDate + sumPricesEndDate) / sumPricesStartDate) ^ (365/days) - 1).toFixed(2)}%`,
      profitRatio: `${((sumPricesEndDate - sumPricesStartDate)/sumPricesStartDate *100).toFixed(2)}%`,
    } 
  }

  handleStartDateChange = (d) => {
    this.setState({ 
      ...this.state,
      startDate: d
     });
  }

  handleEndDateChange = (d) => {
    this.setState({ 
      ...this.state,
      endDate: d
     });
  }

  handleSubmit = () => {
    this.setState({ 
      ...this.state,
      results: this.profit(this.state.startDate, this.state.endDate)
     });
     console.log(this.state)
  }


  render() {
   const {profit, profitRatio, annualProfit } = this.state.results;
    return (
      <div className="mt-5 text-center">
      <div>Start Date: 
      <DatePicker
        onChange={this.handleStartDateChange}
        value={this.state.startDate}
      /></div>
      <div className="mt-2">End Date:
      <DatePicker
        onChange={this.handleEndDateChange}
        value={this.state.endDate}
      /></div>
      <button className="btn btn-primary mt-3" onClick={this.handleSubmit}>Calculate Portfolio Profit</button>
      
      <section>
        <h1>Results</h1>
        <p>Profit: {profit}</p>
        <p>Ratio: {profitRatio}</p>
        <p>Annualized Return Ratio: {annualProfit}</p>
      </section>
      
      </div>
    )
  }
}
