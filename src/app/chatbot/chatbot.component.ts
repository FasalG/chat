import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { filter, map, pipe } from 'rxjs';
import UIkit from 'uikit';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit,AfterViewInit {

  @ViewChild ('chatbottextareascrolling') chatscroll!:ElementRef

  chatstart:boolean=false
  chatstartnext:boolean=false
  catogory:any
  catagoryList:any
  conversationhistory:any=[]
  productsList:any=[]
  chatbotDiv:boolean=true

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    setTimeout(() => {
      this.chatstart=true
    }, 500);
    setTimeout(() => {
      this.chatstartnext=true
    }, 1000);
    setTimeout(() => {
     
    }, 2000);
    
  }
  ngAfterViewInit(): void {
    this.scrollIntoView()
  }

  getProducts(category: string) {
    this.httpClient.get<any[]>('http://localhost:3000/products').subscribe(res => {
      this.productsList= res.filter(el => el.category == category)});

  }

  getCategory() {
    this.httpClient.get<any[]>('http://localhost:3000/category').subscribe(res => {
      console.log(res);
      this.catagoryList=res
      
    });
  }

  catagorycall(){
    this.getCategory()
  }

  onCatagoryClick(catagoryname:any){
      console.log(catagoryname)
      this.catogory=catagoryname
      this.getProducts(this.catogory)      
      this.conversationhistory.push({
        section:"input",
        message:this.catogory
       
      })
      this.scrollIntoView()
      setTimeout(() => {
        this.conversationhistory.push({
          section:'output',
          message:'Below is the collection of '+this.catogory
        })
        this.scrollIntoView()
      }, 500);
      setTimeout(() => {      
        this.conversationhistory.push({
          section:'productcard',
          result: this.productsList
        })
        console.log( this.conversationhistory)
        this.scrollIntoView()
      }, 1000);
      setTimeout(() => {
        this.scrollIntoView()
      }, 1500);
     
    }


  onCartClick(){
        this.chatbotDiv=!this.chatbotDiv
    }


    scrollIntoView() {
      if (this.chatscroll && this.chatscroll.nativeElement) {
        const selectedOption = this.chatscroll.nativeElement.querySelector('.chatbot_textarea-bot');
        if (selectedOption) {
          const container = this.chatscroll.nativeElement;
          const selectedOptionRect = selectedOption.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          console.log(selectedOptionRect, "chatbotdiv")
          console.log(containerRect, "container")
          if (selectedOptionRect.bottom>= containerRect.bottom) {
            container.scrollTop += selectedOptionRect.height - containerRect.height;
          } //else if (selectedOptionRect.top <= containerRect.top) {
          //   container.scrollTop -= containerRect.top - (selectedOptionRect.top-selectedOptionRect.height+2);
          // }
        }
      }
    }
}
