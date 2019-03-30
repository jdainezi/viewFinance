import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { QuoteModel } from './quotes.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // modelo importado do backend
  items: QuoteModel[] = [];
  error: any;

  public chartType: string = 'line';

  public variation: Array<any> = [{ 
    btcday: 0, btcweek: 0, btcmonth: 0, dolarday: 0, dolarweek: 0, dolarmonth: 0, euroday: 0, euroweek: 0, euromonth:0 }];

  public chartDatasets1: Array<any> = [
    {data: [] , label: ''}
  ];

  public chartDatasets2: Array<any> = [
    {data: [] , label: ''}
  ];

  public chartDatasets3: Array<any> = [
    {data: [] , label: ''}
  ];

  public chartLabels: Array<string> = [];

  public date: Array<Date> = [];

  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartLegend: boolean = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    var valueNow: number;
    var valueBefore: number;

    function lastDay(date) {
      // check if time difference is less than a day, in miliseconds
      // using less than equal because the database is read from the older entries
      return Date.now() - date < 86400000;
    };
    function lastWeek(date) {
      // check if time difference is less than a week, in miliseconds
      // using less than equal because the database is read from the older entries
      return Date.now() - date < 604800000;
    };
    function lastMonth(date) {
      // find where month and year entries are equal to now
      var dnow = new Date(Date.now());
      var d = new Date(date);
      return dnow.getMonth() == d.getMonth() && dnow.getFullYear() == d.getFullYear();
    };
    // carrega os dados da api do backend
    this.api.getQuotes().subscribe(
      (items: QuoteModel[]) => {
        function sortbyDate(a, b){
          var keyA = new Date(a.datetime), 
            keyB = new Date(b.datetime);
          // Compare the 2 dates
          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
          return 0;
        };
        this.items = items.map(item => item).sort(sortbyDate);

        // full data to use to calculate variation sorted by primay key
        this.chartDatasets1['data'] = this.items.map(item => item.bitcoin);

        this.chartDatasets2['data'] = this.items.map(item => item.dolar);
        this.chartDatasets3['data'] = this.items.map(item => item.euro);
        this.date = this.items.map(item => new Date(item.datetime));
        this.chartLabels = this.date.slice(this.items.length-24,this.items.length).map(item => (item.getHours()).toString().concat("h") );

        // calculating variations
        valueBefore = this.chartDatasets1['data'][this.date.findIndex(lastDay)];
        valueNow = this.chartDatasets1['data'][this.items.length-1];
        this.variation[0]['btcday'] = (100*(valueNow - valueBefore)/valueBefore).toFixed(2);

        valueBefore = this.chartDatasets1['data'][this.date.findIndex(lastWeek)];
        valueNow = this.chartDatasets1['data'][this.items.length-1];
        this.variation[0]['btcweek'] = (100*(valueNow - valueBefore)/valueBefore).toFixed(2);

        valueBefore = this.chartDatasets1['data'][this.date.findIndex(lastMonth)];
        valueNow = this.chartDatasets1['data'][this.items.length-1];
        this.variation[0]['btcmonth'] = (100*(valueNow - valueBefore)/valueBefore).toFixed(2);

        valueBefore = this.chartDatasets2['data'][this.date.findIndex(lastDay)];
        valueNow = this.chartDatasets2['data'][this.items.length-1];
        this.variation[0]['dolarday'] = (100*(valueNow - valueBefore)/valueBefore).toFixed(2);

        valueBefore = this.chartDatasets2['data'][this.date.findIndex(lastWeek)];
        valueNow = this.chartDatasets2['data'][this.items.length-1];
        this.variation[0]['dolarweek'] = (100*(valueNow - valueBefore)/valueBefore).toFixed(2);

        valueBefore = this.chartDatasets2['data'][this.date.findIndex(lastMonth)];
        valueNow = this.chartDatasets2['data'][this.items.length-1];
        this.variation[0]['dolarmonth'] = (100*(valueNow - valueBefore)/valueBefore).toFixed(2);

        valueBefore = this.chartDatasets3['data'][this.date.findIndex(lastDay)];
        valueNow = this.chartDatasets3['data'][this.items.length-1];
        this.variation[0]['euroday'] = (100*(valueNow - valueBefore)/valueBefore).toFixed(2);

        valueBefore = this.chartDatasets3['data'][this.date.findIndex(lastWeek)];
        valueNow = this.chartDatasets3['data'][this.items.length-1];
        this.variation[0]['euroweek'] = (100*(valueNow - valueBefore)/valueBefore).toFixed(2);

        valueBefore = this.chartDatasets3['data'][this.date.findIndex(lastMonth)];
        valueNow = this.chartDatasets3['data'][this.items.length-1];
        this.variation[0]['euromonth'] = (100*(valueNow - valueBefore)/valueBefore).toFixed(2);

        // last 24h for plot
        this.chartDatasets1 = [
          { data: this.items.slice(this.items.length-24,this.items.length).map(item => item.bitcoin), label: 'Bitcoin' }
        ];
        this.chartDatasets2 = [
          { data: this.items.slice(this.items.length-24,this.items.length).map(item => item.dolar), label: 'Dólar' }
        ];
        this.chartDatasets3 = [
          { data: this.items.slice(this.items.length-24,this.items.length).map(item => item.euro), label: 'Euro' }
        ];
      },
      (error: any) => this.error = error
    );
  }
}

