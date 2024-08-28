import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FileuploadService } from './fileupload.service';
import { Moment } from 'moment'
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormElementsService, Month, Person } from '../form-elements/form-elements.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DualListComponent } from 'angular-dual-listbox';

@Component({
  selector: 'app-advanced-elements',
  templateUrl: './advanced-elements.component.html',
  styleUrls: ['./advanced-elements.component.scss']
})
export class AdvancedElementsComponent implements OnInit {
  active = 1;
  heroForm!: FormGroup;
  cityForm!: FormGroup | any;
  
  public color6: string = '#1973c0';
  public color9: string = '#278ce2';
  public color11: string = '#f2ff00';
  public color13: string = 'rgba(0,255,0,0.5)';

  constructor(private fileUploadService: FileuploadService, private fb: FormBuilder, private FormElementsService: FormElementsService) {}

  // dropzone
  files: File[] = [];
  filesPreview: File[] = [];
  filesDisabled: File[] = [];
  disable = true;

	onSelect(event) {
		// console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		// console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
	onPreviewFileSelect(event) {
		// console.log(event);
		this.filesPreview.push(...event.addedFiles);
	}

	onPreviewFileRemove(event) {
		// console.log(event);
		this.filesPreview.splice(this.filesPreview.indexOf(event), 1);
	}


  public disabled: boolean = false;


  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }

  //    file.io
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  fileUpload: File | any= null; // Variable to store fileUpload



  // On fileUpload Select
  onChange(event) {
      this.fileUpload = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
      this.loading = !this.loading;
      console.log(this.fileUpload);
      this.fileUploadService.upload(this.fileUpload).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {

                  // Short link via api response
                  this.shortLink = event.link;

                  this.loading = false; // Flag variable 
              }
          }
      );
  }

  // ng-select
  
    selectedAccount = 'AZ';
    accounts = [
        { name: 'Arizona', value: 'AZ', country: 'Mountain Time Zone', child: { state: 'Active' } },
        { name: 'Colorado', value: 'CO', country: 'Mountain Time Zone', child: { state: 'Active' } },
        { name: 'Idaho', value: 'ID', country: 'Mountain Time Zone', child: { state: 'Active' } },
        { name: 'Montana', value: 'MT', country: 'Mountain Time Zone', child: { state: 'Active' } },
        { name: 'Nebraska', value: 'NE', country: 'Mountain Time Zone', child: { state: 'Active' } },
        { name: 'New Mexico', value: 'NM', country: 'Mountain Time Zone', child: { state: 'Active' } },
        { name: 'North Dakota', value: 'AZ', country: 'Mountain Time Zone', child: { state: 'Active' } },
        { name: 'Utah', value: 'UT', country: 'Mountain Time Zone', child: { state: 'Active' } },
        { name: 'Wyoming', value: 'WY', country: 'Mountain Time Zone', child: { state: 'Active' } },
        { name: 'Alabama', value: 'AL', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Arkansas', value: 'AR', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Illinois', value: 'IL', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Iowa', value: 'IA', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Kansas', value: 'KS', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Kentucky', value: 'KY', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Louisiana', value: 'LA', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Minnesota', value: 'MN', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Mississippi', value: 'MS', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Missouri', value: 'MO', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Oklahoma', value: 'OK', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'South Dakota', value: 'SD', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Texas', value: 'TX', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Tennessee', value: 'TN', country: 'Central Time Zone', child: { state: 'Active' } },
        { name: 'Wisconsin', value: 'WI', country: 'Central Time Zone', child: { state: 'Active' } },
    ];
    selectedUsersList = ['Firefox'];
    UsersList = [
        { name: 'Firefox', value: 'Firefox'},
        { name: 'Chrome', value: 'Chrome'},
        { name: 'Safari', value: 'Safari'},
        { name: 'Opera', value: 'Opera'},
        { name: 'Internet Explorer', value: 'Internet Explorer'}
    ];

    // 
    
  public color: string = '#2889e9'; 
  public color1: string = '#e920e9';

  
  model!: NgbDateStruct;
  selected!: {startDate: Moment, endDate: Moment};

  // 
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
	PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

  //

  month: Month[] = [];
  selectedMonth = '6';
  month$!: Observable<any[]>;
  people: Person[] = [];
  selectedPeople = [];
  selectedCompanies;
  companies: any[] = [];
  companiesNames = ['Uber', 'Microsoft', 'Flexigen'];
  ngOnInit(): void {
    this.people$ = this.FormElementsService.getPeople();
    this.heroForm = this.fb.group({
      month: [null, Validators.required],
    });
    this.cityForm = this.fb.group({
      selectedCitiesIds: [] 
    });
    // Month
    this.FormElementsService.getMonth().subscribe(ele => this.month = ele);
    this.month$ = this.FormElementsService.getMonth();
    this.multiselect$ = this.FormElementsService.getMonth();

    this.FormElementsService.getPeople()
      .pipe(map(x => x.filter(y => !y.disabled)))
      .subscribe((res) => {
          this.people = res;
          this.selectedPeople = [];
    });
    this.companiesNames.forEach((c, i) => {
      this.companies.push({ id: i, name: c });
    });

    this.doReset();
  }
 

  toggleAgeDisable() {    
    if (this.heroForm.controls['month'].disabled) {
        this.heroForm.controls['month'].enable();
    } else {
        this.heroForm.controls['month'].disable();
    }
  }

  // Group by Item Key
  GroupAccount = 'Adam';
  groupaccounts = [
      { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States', child: { state: 'Active' } },
      { name: 'Homer', email: 'homer@email.com', age: 47, country: '', child: { state: 'Active' } },
      { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States', child: { state: 'Active' } },
      { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina', child: { state: 'Active' } },
      { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina', child: { state: 'Active' } },
      { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador', child: { state: 'Active' } },
      { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador', child: { state: 'Inactive' } },
      { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador', child: { state: 'Inactive' } },
      { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia', child: { state: 'Inactive' } },
      { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia', child: { state: 'Inactive' } },
      { name: 'Nicolás', email: 'nicole@email.com', age: 43, country: 'Colombia', child: { state: 'Inactive' } }
  ];
  groupByFn = (item) => item.child.state;

  groupValueFn = (_: string, children: any[]) => ({ name: children[0].child.state, total: children.length });

  //
  selectedAccounts = [{ name: 'Adam' }];
  compareAccounts = (item, selected) => {
    if (selected.country && item.country) {
        return item.country === selected.country;
    }
    if (item.name && selected.name) {
        return item.name === selected.name;
    }
    return false;
  };
  //
  hideselectedAccounts = [{ name: 'Adam' }];
  hidecompareAccounts = (item, selected) => {
    if (selected.country && item.country) {
        return item.country === selected.country;
    }
    if (item.name && selected.name) {
        return item.name === selected.name;
    }
    return false;
  };

  // show/hide
  isCitiesControlVisible = true;
  cities: any[] = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys (Disabled)', disabled: true },
    { id: 4, name: 'Pabradė' },
  ];
  toggleCitiesControl() {
    this.isCitiesControlVisible = !this.isCitiesControlVisible;
  }

  clearCities() {
      this.cityForm.get('selectedCitiesIds').patchValue([]);
  }

  //
  
  multiselect$!: Observable<any[]>;
  selectedmultiselect = [{ label: 'May' }];

  //
  people$!: Observable<any[]>;
  selectedPeopleMultiple = [];
  selectedPeopleHidden = [];

  //
  addTagPromise(name) {
    return new Promise((resolve) => {
        this.loading = true;
        // Simulate backend call.
        setTimeout(() => {
            resolve({ id: 5, name: name, valid: true });
            this.loading = false;
        }, 1000);
    })
  }

  // dual list
  tab = 1;
	keepSorted = true;
	key!: string;
	display: any;
	filter = false;
	source!: Array<any>;
	confirmed!: Array<any>;
	userAdd = '';
	disableDL = false;

	sourceLeft = true;
	format: any = DualListComponent.DEFAULT_FORMAT;

	private sourceTube!: Array<string>;
	private sourceStations!: Array<any>;
	private sourceChessmen!: Array<any>;

	private confirmedTube!: Array<string>;
	private confirmedStations!: Array<any>;
	private confirmedChessmen!: Array<any>;

	arrayType = [
		{ name: 'Rio Grande', detail: '(object array)', value: 'station' },
		{ name: 'Chessmen', detail: '(object array)', value: 'chess' },
		{ name: 'Underground', detail: '(string array)', value: 'tube' }
	];

	types = this.arrayType[0].value;

	private stations: Array<any> = [
		{ key: 1, station: 'Antonito', state: 'CO' },
		{ key: 2, station: 'Big Horn', state: 'NM' },
		{ key: 3, station: 'Sublette', state: 'NM' },
		{ key: 4, station: 'Toltec', state: 'NM' },
		{ key: 5, station: 'Osier', state: 'CO' },
		{ key: 6, station: 'Chama', state: 'NM'},
		{ key: 7, station: 'Monero', state: 'NM' },
		{ key: 8, station: 'Lumberton', state: 'NM' },
		{ key: 9, station: 'Duice', state: 'NM' },
		{ key: 10, station: 'Navajo', state: 'NM' },
		{ key: 11, station: 'Juanita', state: 'CO' },
		{ key: 12, station: 'Pagosa Jct', state: 'CO' },
		{ key: 13, station: 'Carracha', state: 'CO' },
		{ key: 14, station: 'Arboles', state: 'CO' },
		{ key: 15, station: 'Solidad', state: 'CO' },
		{ key: 16, station: 'Tiffany', state: 'CO' },
		{ key: 17, station: 'La Boca', state: 'CO' },
		{ key: 18, station: 'Ignacio', state: 'CO' },
		{ key: 19, station: 'Oxford', state: 'CO' },
		{ key: 20, station: 'Florida', state: 'CO' },
		{ key: 21, station: 'Bocea', state: 'CO' },
		{ key: 22, station: 'Carbon Jct', state: 'CO' },
		{ key: 23, station: 'Durango', state: 'CO' },
		{ key: 24, station: 'Home Ranch', state: 'CO' },
		{ key: 25, station: 'Trimble Springs', state: 'CO' },
		{ key: 26, station: 'Hermosa', state: 'CO' },
		{ key: 27, station: 'Rockwood', state: 'CO' },
		{ key: 28, station: 'Tacoma', state: 'CO' },
		{ key: 29, station: 'Needleton', state: 'CO' },
		{ key: 30, station: 'Elk Park', state: 'CO' },
		{ key: 31, station: 'Silverton', state: 'CO' },
		{ key: 32, station: 'Eureka', state: 'CO' }
	];

	private chessmen: Array<any> = [
		{ _id: 1, name: 'Pawn' },
		{ _id: 2, name: 'Rook' },
		{ _id: 3, name: 'Knight' },
		{ _id: 4, name: 'Bishop' },
		{ _id: 5, name: 'Queen' },
		{ _id: 6, name: 'King' }
	];

	private tube: Array<string> = [
		'Harrow & Wealdstone',
		'Kenton',
		'South Kenton',
		'North Wembley',
		'Wembley Central',
		'Stonebridge Park',
		'Harlesden',
		'Willesden Junction',
		'Kensal Green',
		"Queen's Park",
		'Kilburn Park',
		'Maida Vale',
		'Warwick Avenue',
		'Paddington',
		'Edgware Road',
		'Marylebone',
		'Baker Street',
		"Regent's Park",
		'Oxford Circus',
		'Piccadilly Circus',
		'Charing Cross',
		'Embankment',
		'Waterloo',
		'Lambeth North',
		'Elephant & Castle'
	];
  private stationLabel(item: any) {
		return item.station + ', ' + item.state;
	}

	private useStations() {
		this.key = 'key';
		this.display = this.stationLabel;
		this.keepSorted = true;
		this.source = this.sourceStations;
		this.confirmed = this.confirmedStations;
	}

	private useChessmen() {
		this.key = '_id';
		this.display = 'name';
		this.keepSorted = false;
		this.source = this.sourceChessmen;
		this.confirmed = this.confirmedChessmen;
	}

	private useTube() {
		this.key = '';
		this.display = undefined;
		this.keepSorted = false;
		this.source = this.sourceTube;
		this.confirmed = this.confirmedTube;
	}

	swapSource(types: string) {
		switch (types) {
		case this.arrayType[0].value:
			this.useStations();
			break;
		case this.arrayType[1].value:
			this.useChessmen();
			break;
		case this.arrayType[2].value:
			this.useTube();
			break;
		}
	}

	doReset() {
		this.sourceChessmen = JSON.parse(JSON.stringify(this.chessmen));
		this.sourceStations = JSON.parse(JSON.stringify(this.stations));
		this.sourceTube = JSON.parse(JSON.stringify(this.tube));
		this.confirmedChessmen = new Array<any>();
		this.confirmedStations = new Array<any>();
		this.confirmedTube = new Array<string>();

		// Preconfirm some items.
		this.confirmedStations.push( this.stations[31] );
		this.confirmedTube.push( this.tube[13] );
		this.confirmedTube.push( this.tube[23] );

		switch (this.types) {
		case this.arrayType[0].value:
			this.useStations();
			break;
		case this.arrayType[1].value:
			this.useChessmen();
			break;
		case this.arrayType[2].value:
			this.useTube();
			break;
		}
	}

	doDelete() {
		if (this.source.length > 0) {
			this.source.splice(0, 1);
		}
	}

	doCreate() {
		if (typeof this.source[0] === 'object') {
			const o = {};
			o[this.key] = this.source.length + 1;
			o[this.display] = this.userAdd;
			this.source.push( o );
		} else {
			this.source.push(this.userAdd);
		}
		this.userAdd = '';
	}

	doAdd() {
		for (let i = 0, len = this.source.length; i < len; i += 1) {
			const o = this.source[i];
			const found = this.confirmed.find( (e: any) => e === o );
			if (!found) {
				this.confirmed.push(o);
				break;
			}
		}
	}

	doRemove() {
		if (this.confirmed.length > 0) {
			this.confirmed.splice(0, 1);
		}
	}

	doFilter() {
		this.filter = !this.filter;
	}

	filterBtn() {
		return (this.filter ? 'Hide Filter' : 'Show Filter');
	}

	doDisable() {
		this.disabled = !this.disabled;
	}

	disableBtn() {
		return (this.disabled ? 'Enable' : 'Disabled');
	}

	swapDirection() {
		this.sourceLeft = !this.sourceLeft;
		this.format.direction = this.sourceLeft ? DualListComponent.LTR : DualListComponent.RTL;
	}

}
