HelloWorld = React.createClass({
    render: function() {
        return (
        <div className="">
            <h2 className="">
                helloworld!
            </h2>
        </div>
        );
    }
});
React.render(
    <HelloWorld/>,
    document.getElementById('content')
    );