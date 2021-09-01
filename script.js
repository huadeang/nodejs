import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  var res = http.get('http://localhost:3000/ชีวเคมีอาหาร');
//   sleep(1);
//   console.log('Response time was ' + String(res.timings.duration) + ' ms');
}
