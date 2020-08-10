import { KeepAlive, Context } from '../components/common/KeepAlive';

function Test(){
    return (
      <input />
    )
}

export default function (props) {
    return (
        <Router>
            <Switch>
                <Context>
                    <Route
                        path="/"
                        exact
                        render={(props) => {
                            return (
                                <KeepAlive cacheId="a">
                                    <Test {...props} />
                                </KeepAlive>
                            );
                        }}
                    />
                    <Route
                        path="/xxxx"
                        exact
                        render={(props) => {
                            return (
                                <KeepAlive cacheId="a">
                                    <Test {...props} />
                                </KeepAlive>
                            );
                        }}
                    />
                </Context>
            </Switch>
        </Router>
    );
}
