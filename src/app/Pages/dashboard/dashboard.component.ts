import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Chart from 'chart.js/auto';
import { DataTablesModule } from "angular-datatables";
import { Config } from 'datatables.net';
@Component({
  selector: 'app-dashboard',
  imports: [ FormsModule ,CommonModule,DataTablesModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
 constructor( private router: Router)
 {}

 summaryData = [
 {
        "label": "Live Devices",
        "count": 446,
        "icon": "ri-check-double-line",
        "color": "bg-success"
    },
{
        "label": "Offline Devices",
        "count": 64,
        "icon": "ri-close-fill",
        "color": "bg-danger"
    },
    {
        "label": "Alerts",
        "count": 36,
        "icon": "ri-alert-fill",
        "color": "bg-warning"
    },
    {
        "label": "Total Assets",
        "count": 510,
        "icon": "ri-wallet-3-fill",
        "color": "bg-primary"
    }
  ]
 devices=[
    {
    "type": "desktop",
    "icon": "bi-pc-display",
    "title": "Desktops",
    "count": 170,
    "alerts": 12,
    "alertClass": "bg-warning text-dark"
    },
    {
    "type": "laptop",
    "icon": "bi-laptop",
    "title": "Laptops",
    "count": 65,
    "alerts": 8,
    "alertClass": "bg-warning text-dark"
    },
    {
    "type": "server",
    "icon": "bi-server",
    "title": "Servers",
    "count": 85,
    "alerts": 10,
    "alertClass": "bg-danger"
    },
    {
    "type": "mobile",
    "icon": "bi-phone",
    "title": "Mobile",
    "count": 20,
    "alerts": 5,
    "alertClass": "bg-danger"
    },
    {
    "type": "switch",
    "icon": "bi-hdd-stack",
    "title": "Switches",
    "count": 70,
    "alerts": 1,
    "alertClass": "bg-success"
    },
    
    {
    "type": "other",
    "icon": "bi-device-hdd",
    "title": "Other",
    "count": 100,
    "alerts": 0,
    "alertClass": "bg-secondary"
    }
    ]
   alertdata=[
      {
        "device": "SRV-50012",
        "deviceType": "Server",
        "type": "Hardware",
        "message": "High memory usage (98%)",
        "date": "2023-07-15 10:15:33",
        "status": "Added"
      },
      {
        "device": "DESK-10045",
        "deviceType": "Desktop",
        "type": "Software",
        "message": "High CPU usage",
        "date": "2023-07-15 09:32:45",
        "status": "Removed"
      },
      {
        "device": "LAP-20432",
        "deviceType": "Laptop",
        "type": "Service",
        "message": "Battery failure",
        "date": "2023-07-14 14:22:10",
        "status": "Added"
      }
    
   ]
      ngOnInit() {
        this.createChart();
       this.ondatableConfig();
      }
      createChart() {
        const ctx = document.getElementById('deviceChart') as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'doughnut', // or 'line', 'pie', etc.
          data: {
            labels: ['Desktops', 'Laptops', 'Mobile', 'Switches', 'Servers', 'Other'],
            datasets: [{
                data: [170, 65, 20, 70, 85, 100],
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#36b9cc',
                    '#f6c23e',
                    '#6f42c1',
                    '#e74a3b'
                ],
                hoverBackgroundColor: [
                    '#2e59d9',
                    '#17a673',
                    '#2c9faf',
                    '#dda20a',
                    '#5a3c9f',
                    '#be2617'
                ],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            },
            cutout: '70%'
        }
        });
      }
      OnsystemList(){
         this.router.navigate(['/main/systemlist'])
      }
      
 
      dtOptions: Config = {};

     ondatableConfig(){
        this.dtOptions = {
          layout: {
            bottomEnd: {
                paging: {
                    firstLast: false
                }
            }
        },
          language: {
            paginate: {
                previous: 'Previous',
                next: 'Next'
            },
            info: 'Page _PAGE_ of _PAGES_',
            infoEmpty: 'No records available',
            infoFiltered: '(filtered from _MAX_ total records)'
        }
        };
      }
      onviewAlert(data:any){
     alert(data.deviceType);

      }
      ondeleteAlert(data: any) {
       
        const updatedAlerts = this.alertdata.filter(alert => {
          // 3. More robust comparison - assuming 'device' is a unique identifier
          return alert.device !== data.device;
        });
      
        this.alertdata = [...updatedAlerts];
        
        
      }
    
}
