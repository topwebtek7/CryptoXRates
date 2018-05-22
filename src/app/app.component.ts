import { Component } from '@angular/core'
import { environment } from '../environments/environment'

let API_URL = '/api'
if (!environment.production) {
  API_URL = 'http://127.0.0.1:4040/api'
}
interface OnDestroy {
  ngOnDestroy(): void
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title: string = 'CryptoCurrencies Exchange Rates'
  loading: boolean = false
  data: any = null
  interval: any

  constructor(){
    this.tick = this.tick.bind(this)
    this.interval = setInterval(this.tick, 60000)

    this.tick()
  }

  tick() {
    this.loading = true
    fetch(`${API_URL}/cryptoData`)
      .then(res => res.json())
      .then(d => {
        this.data = d
        this.loading = false
      })
  }
  
  ngOnDestroy() {
    clearInterval(this.interval)
  }
}
