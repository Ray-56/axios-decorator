import { GET } from '../lib'
window.log = console.log.bind(console);

class Init {

    @GET('/api/v1/topic/5433d5e4e737cbe96dcef312{0}{1}{2}', 111, 222, 333)
    // @GET({url: '/api/v1/topic/5433d5e4e737cbe96dcef312', params: {limit: 10}})
    getData(data) {
        return data;
    }

    geta() {
        console.log(this.getData())
    }
}

const init = new Init();
init.geta()
