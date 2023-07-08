import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, img, newsurl, author, date } = this.props;
        return (
            <div>
                
                    <div className="col">
                        <div className="card">
                            <img src={img?img:"https://images.hindustantimes.com/tech/img/2022/08/06/1600x900/asteroid-6075461_1920_1659775367751_1659775386471_1659775386471.jpg"} 
                            className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{title}...</h5>
                                <p className="card-text">{description}...</p>
                                <p className="card-text"><small className="text-muted">By {!author? "Unknown":author} on {new Date(date).toUTCString()}</small></p>
                                <a rel="noreferrer" href={newsurl} target="_blank" className='btn btn-sm btn-primary'>Read More</a>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default NewsItem