import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    category: PropTypes.string.isRequired
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      // loading: false,
      page: 1,
      totalResults: 0
    }
  }
  async updateNews(pageNo) {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a53cc05be3694269abe9e97f36ba95ec&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
    this.setState({
      page: this.state.page + 1
    })
  }

  // prevButton = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a53cc05be3694269abe9e97f36ba95ec&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true});
  //   let data = fetch(url);
  //   let parseData = await (await data).json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parseData.articles,
  //     loading: false
  //   })
  //   this.setState({
  //     page: this.state.page - 1,
  //   })
  //   this.updateNews();
  // }
  // nextButton = async () => {
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a53cc05be3694269abe9e97f36ba95ec&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading: true});
  //     let data = fetch(url);
  //     let parseData = await (await data).json();
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parseData.articles,
  //       loading: false
  //     })
  //   }
  //   this.setState({
  //     page: this.state.page + 1,
  //   })
  //   this.updateNews();
  // }

  fetchMoreData = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a53cc05be3694269abe9e97f36ba95ec&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults
    })
    this.setState({
      page: this.state.page + 1
    })
    console.log(this.state.page);
    this.props.setProgress(100);
  };
  render() {
    return (
      <div className='container mb-5' style={{marginTop: "60px"}}>
        <h3 className='text-center my-3'>Top Headlines For - {this.props.category}</h3>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container-fluid">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-2">
              {this.state.articles.map((element) => (
                <NewsItem key={element.url} title={element.title ? element.title.slice(0, 33) : ""} img={element.urlToImage} description={element.description ? element.description.slice(0, 65) : ""} newsurl={element.url} author={element.author} date={element.publishedAt} />
              ))}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container my-2 d-flex justify-content-around">
          <button disabled={this.state.page <= 1} type="button" onClick={this.prevButton} className="btn btn-primary">Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.nextButton} className="btn btn-primary">Next</button>
        </div> */}
      </div>
    )
  }
}

export default News