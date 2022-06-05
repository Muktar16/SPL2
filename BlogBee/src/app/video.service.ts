import { Injectable } from '@angular/core';
import {Video} from './video';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

 
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  //  Videos: Video[]=
  // [
  //   { "videoId": "Y86abolKENE", "title": "2020 Mac Mini UNBOXING and REVIEW!", "videoNo": "1"},
  //   { "videoId": "C118ADYpEqo", "title": "Diversity of Bodies & Sizes (but mostly crabs): Crash Course Zoology #3", "videoNo": "2"},
  //   { "videoId": "LvL3YXa0n2M", "title": "Christianity 101 | National Geographic", "videoNo": "3"},
  //   { "videoId": "OmYVHWJf590", "title": "Merry and gesus explained", "videoNo": "4"},
  //   { "videoId": "mYhy7eaazIk", "title": "Telescope", "videoNo": "5"},
  //   { "videoId": "4x6zzQcMT3w", "title": "Mysterious Nation religion", "videoNo": "6"},
  //   { "videoId": "qf49ZFIIGlk", "title": "Early Computing: Crash Course", "videoNo": "7"},
  //   { "videoId": "XPgtfOwuUGY", "title": "Apollo 11: The Untold Story Of the IBM Team Behind the Moon Landing", "videoNo": "8"},
  //   { "videoId": "veMFCFyOwFI", "title": "The Middle East's cold war, explained", "videoNo": "9"},
  //   { "videoId": "gQGWqA22s5s", "title": "Biomedicine: Crash Course History of Science #34", "videoNo": "10"},
  //   { "videoId": "mdOJ717PKRc", "title": "How Motorcycles Work - The Basics", "videoNo": "11"},
  //   { "videoId": "l128tW1H5a8", "title": "Urinary System, Part 1: Crash Course A&P #38", "videoNo": "12"},
  //   { "videoId": "wOclF9eP5uM", "title": "The Age of Exploration: Crash Course European History #4", "videoNo": "13"},
  //   { "videoId": "XjgfnS7qKCI", "title": "Five reasons the Middle East is in crisis - Newsnight", "videoNo": "14"},
  //   { "videoId": "jAhjPd4uNFY", "title": "Genetic Engineering Crash Course", "videoNo": "15"},
  //   { "videoId": "O5nskjZ_GoI", "title": "Course Computer Science #1", "videoNo": "16"},
  //   { "videoId": "aJKkUFR4eDA", "title": "How & What Animals Eat: Crash Course Zoology #4", "videoNo": "17"},
  //   { "videoId": "lrk4oY7UxpQ", "title": "Introduction: Crash Course U.S. Government and Politics", "videoNo": "18"},
  //   { "videoId": "GPOv72Awo68", "title": "How it Happened - The 2008 Financial Crisis: Crash Course Economics #12", "videoNo": "19"},
  //   { "videoId": "kBpQiJt3MUQ", "title": "Pre-Islamic history of the Middle East", "videoNo": "20"},
  //   { "videoId": "6aMW5mOKxB8", "title": "history of hockey game", "videoNo": "21"},
  //   { "videoId": "tecocKSclwc", "title": "Florence and the Renaissance: Crash Course European History #2", "videoNo": "22"},
  //   { "videoId": "_r9kSA3s2fQ", "title": "Brainy & Brainless Animals: Crash Course Zoology #5", "videoNo": "23"},
  //   { "videoId": "m6dCxo7t_aE", "title": "The five major world religions - John Bellamy", "videoNo": "24"},
  //   { "videoId": "TpcbfxtdoI8", "title": "Islam, the Quran, and the Five Pillars: Crash Course World History #13", "videoNo": "25"},
  //   { "videoId": "xlBEEuYIWwY", "title": "What Is Hinduism??", "videoNo": "26"},
  //   { "videoId": "JOWFPTzK7D4", "title": "The Mecca Mystery: Are Muslims Praying In The Wrong Direction? | Sacred City | Timeline", "videoNo": "27"},
  //   { "videoId": "4aXtAWOxBNA", "title": "ASK DR ZAKIR - AN EXCLUSIVE OPEN QUESTION & ANSWER SESSION - 1 | DUBAI | DR ZAKIR NAIK", "videoNo": "28"},
  //   { "videoId": "E6cKvPo4Dv8", "title": "John L. Esposito - The Future of Islam", "videoNo": "29"},
  //   { "videoId": "INIG636SnU4", "title": "Islam, Judaism, and Christianity - A Conversation", "videoNo": "30"},
  //   { "videoId": "Q_szgVMAC-E", "title": "10 Biggest Differences Between ISLAM & JUDAISM", "videoNo": "31"},
  //   { "videoId": "9nZHT0yStEc", "title": "Is it the same God for Muslims, Christians, and Jews?", "videoNo": "32"},
  //   { "videoId": "oylHszMFlgg", "title": "What if: America's Four Political Parties | Meet The Press | NBC News", "videoNo": "33"},
  //   { "videoId": "dh3mKgkgWFc", "title": "Trudeau: Canada-U.S. Successful Alliance In History Of The Modern World | Meet The Press | NBC News", "videoNo": "34"},
  //   { "videoId": "aBglxa6K8gc", "title": "President Trump's Full, Unedited Interview With Meet The Press | NBC News", "videoNo": "35"},
  //   { "videoId": "K8Z9Kqhrh5c", "title": "Watch In Full: Trump versus Biden in the first US Presidential election debate", "videoNo": "36"},
  //   { "videoId": "4Ro9H6bmdOg", "title": "Digital oppression in Bangladesh | The Listening Post feature", "videoNo": "37"},
  //   { "videoId": "9qRxNYuR2c4", "title": "Dictator's Dilemma (Full Episode) | North Korea: Inside the Mind of a Dictator", "videoNo": "38"},
  //   { "videoId": "NIgqhU4lkgo", "title": "Putin's Way (full documentary) | FRONTLINE", "videoNo": "39"},
  //   { "videoId": "GC_FFIYz4G0", "title": "Financial Secrecy Index U.S. Launch with FACT", "videoNo": "40"},
  //   { "videoId": "Gwr7dpyA7qM", "title": "Pelosi's Power (full documentary) | FRONTLINE", "videoNo": "41"},
  //   { "videoId": "5IBa88VkM6g", "title": "The Crown Prince of Saudi Arabia (full film) | FRONTLINE", "videoNo": "42"},
  //   { "videoId": "9Hxt3GttF38", "title": "8 INVENTIONS AND TECHNOLOGIES THAT WILL CHANGE OUR WORLD", "videoNo": "43"},
  //   { "videoId": "Q1mZ4ADUEZs", "title": "Elon Musk's Future City", "videoNo": "44"},
  //   { "videoId": "SGP6Y0Pnhe4", "title": "HOW IT WORKS: The International Space Station", "videoNo": "45"},
  //   { "videoId": "5KygwcZ545U", "title": "Shuttle Atlantis STS-132 - Amazing Shuttle Launch Experience", "videoNo": "46"},
  //   { "videoId": "P4boyXQuUIw", "title": "Mars Science Laboratory Curiosity Rover Animation", "videoNo": "47"},
  //   { "videoId": "1tOx_Vh5diE", "title": "2021's Breakthroughs in Neuroscience and Other Biology", "videoNo": "48"},
  //   { "videoId": "nlSL7Qg7-Po", "title": "Intro to Neuroscience", "videoNo": "49"},
  //   { "videoId": "X3TAROotFfM", "title": "Human digestive system - How it works! (Animation)", "videoNo": "50"},
  //   { "videoId": "_VhcZTGv0CU", "title": "Immunology in the skin", "videoNo": "51"},
  //   { "videoId": "yqLlgIaz1L0", "title": "Have you ever seen an atom?", "videoNo": "52"},
  //   { "videoId": "77FkWW75dX4", "title": "Top 5 Simple Electronics projects", "videoNo": "53"},
  //   { "videoId": "pSFkiqtGgjs", "title": "simple clap control home-automation.....#clapswitch", "videoNo": "54"},
  //   { "videoId": "d5lEkz3Bomc", "title": "The Rise and Stagnation of IBM", "videoNo": "55"},
  //   { "videoId": "LDSiR024aKk", "title": "12 Mac Apps Worth Getting Right Away 2022", "videoNo": "56"},
  //   { "videoId": "ttjPZufCeno", "title": "Portable Mac Desk Setup 2022 - the Power of the Apple Ecosystem", "videoNo": "57"},
  //   { "videoId": "Uh9643c2P6k", "title": "Introducing Windows 11", "videoNo": "58"},
  //   { "videoId": "TGe3djKdblQ", "title": "Windows Insider Webcast - The #BeamMachine", "videoNo": "59"},
  //   { "videoId": "DEYoAkjN_yc", "title": "Does Windows 11 Gaming Suck", "videoNo": "60"},
  //   { "videoId": "YqQx75OPRa0", "title": "Beginning Graphic Design: Fundamentals", "videoNo": "61"},
  //   { "videoId": "r6g6_CJZI_c", "title": "The Best Beginner Motorcycles - Review", "videoNo": "62"},
  //   { "videoId": "L-Uo3c62a8Q", "title": "Using artificial intelligence to help detect breast cancer | Google Health", "videoNo": "63"},
  //   { "videoId": "dFCbJmgeHmA", "title": "The Day the Dinosaurs Died – Minute by Minute", "videoNo": "64"}
  //   ];

  constructor(private _http: HttpClient) { }

  //videos: any = [];
  
  compileVideoToText(targetVideo: Video) {
    
  }
  

  // Get all videos
 getVideos(): Observable<any> {
     return this._http.get('http://localhost:3000/videoInfo');
  }


  // temporary function to add videos into database
  // addAllVideos() {
  //     //console.log(this.Videos);
  //     this._http.post('http://localhost:3000/insertVideos',this.Videos).subscribe(data=>{
  //       console.log(data);
  //     })
  // }
 
  
  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}