var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

var AvatarHeader = createReactClass({
    render: function() {
        var headerstyle = {
            height: 150,
            backgroundColor: "#9BC345",
        };
        return(
            <div style={headerstyle}> </div>
        );
    }
});
var Avatar = createReactClass({
    render: function() {
        var user_photo = {
            position:"relative",
            background: "#fff",
            padding: 5,
            width: 130,
            height: 130,
            borderRadius: 75,
            borderWidth: 1 ,
            birderStyle:'solid',
            left: 250,
            bottom: 50
        };
        var img_style ={
            width: 130,
            borderRadius: 75
        };
        return(
            <div style={user_photo}>
                <img style={img_style} src={this.props.source}/>
            </div>
        );
    }
});
var Details = createReactClass({
    render: function() {
        var title = {
            color: "#999",
            fontSize: 18,
            margin: 0
        };
        var detail_value ={
            color: "#2c2e31",
            fontSize: 38,
            margin: 5
        }
        return(
            <div>
                <p style={title}>My Name is</p>
                <p style={detail_value}>{this.props.value}</p>
            </div>
        );
    }
});
var Card = createReactClass({
    render: function() {
        var cardStyle = {
            height: 380,
            width: 650,
            margin: 40,
            backgroundColor: "#FFF",
            textAlign: "center",
            WebkitFilter: "drop-shadow(0px 0px 5px #666)",
            filter: "drop-shadow(0px 0px 5px #666)"
        };
        return (
            <div style={cardStyle}>
                <AvatarHeader/>
                <Avatar source ={this.props.data.picture.medium}/>
                <Details value={this.props.data.name.first}/>
            </div>
        );
    }
});

module.exports = Card;