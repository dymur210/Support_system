import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    
    form = this.fb.group({file: ['', [Validators.required]]});
    file: File | null = null;
    input = "";
    arr = [""];
    str = "";
    lineArr = [""];

    cnt_edu = 0;
    cnt_edu_jin = 0;
    cnt_edu_sya = 0;
    cnt_edu_sou = 0;
    cnt_edu_gai = 0;
    cnt_edu_hoken = 0;
    cnt_edu_jyou = 0;

    cnt_spe = 0;
    //
    cnt_spe_kyouki_hi=0;
    cnt_spe_courseki_hi=0;
    cnt_spe_kyo_co_hi=0;//共基＋コース基の必修
    cnt_spe_senhi_group1=0;//数学系
    cnt_spe_senhi_group2=0;//英語系
    cnt_spe_senhi_group3=0;//データサイエンス、プログラミング系
    cnt_spe_senhi=0;
    cnt_spe_courseki_sen=0;
    cnt_spe_coursesen_hi=0;
    cnt_spe_coursesen_sen=0;
    cnt_spe_kyou_sen=0;
    //
    cnt_fre = 0;
  title: any;

    constructor(private fb: FormBuilder) {
    }

    get f() {
        return this.form.controls;
    }

    ngOnInit() {
    }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        }
    }

    submit() {
        this.readAsText(this.file!).then(result => this.input = result);
    }

    private readAsText(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {

                this.str = reader.result as string;
                this.lineArr = this.str.split("\n");
                //this.arr = this.str.split(",");
                //this.cnt += ( this.lineArr[5].match( /人文/g ) && this.lineArr[5].match( /あ/g ) || []).length;

                for (let i=5;i<=this.str.length;i++) {
                this.cnt_edu_jin += 2*(( this.lineArr[i].match( /教養教育科目/ ) && this.lineArr[i].match( /人文科学系/ ) && this.lineArr[i].match( /合/ ) || []).length);
                this.cnt_edu_sya += 2*(( this.lineArr[i].match( /教養教育科目/ ) && this.lineArr[i].match( /社会科学系/ ) && this.lineArr[i].match( /合/ ) || []).length);
                this.cnt_edu_sou += 2*(( this.lineArr[i].match( /教養教育科目/ ) && this.lineArr[i].match( /総合科目系/ ) && this.lineArr[i].match( /合/ ) || []).length);
                this.cnt_edu_gai += (( this.lineArr[i].match( /教養教育科目/ ) && this.lineArr[i].match( /外国語系/ ) && this.lineArr[i].match( /合/ ) || []).length);
                this.cnt_edu_hoken += (( this.lineArr[i].match( /教養教育科目/ ) && this.lineArr[i].match( /保健体育系/ ) && this.lineArr[i].match( /合/ ) || []).length);
                this.cnt_edu_jyou += 2*(( this.lineArr[i].match( /教養教育科目/ ) && this.lineArr[i].match( /情報処理系/ ) && this.lineArr[i].match( /合/ ) || []).length);
                this.cnt_edu = this.cnt_edu_jin + this.cnt_edu_sya + this.cnt_edu_sou + this.cnt_edu_gai + this.cnt_edu_hoken + this.cnt_edu_jyou;

                //
                this.cnt_spe_kyouki_hi+= ( this.lineArr[i].match( /知的財産/ ) && this.lineArr[i].match(/必修/)&& this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_courseki_hi+= 2*( this.lineArr[i].match( /創造工学入門ゼミナール/ ) && this.lineArr[i].match(/必修/) && this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_kyo_co_hi=this.cnt_spe_kyouki_hi+this.cnt_spe_courseki_hi;
                this.cnt_spe_senhi_group1+= 2*( this.lineArr[i].match( /微分積分Ⅰ/ ) &&  this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_senhi_group1+= 2*( this.lineArr[i].match( /線形代数Ⅰ/ ) &&  this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_senhi_group1+= 2*( this.lineArr[i].match( /基礎物理学(A)/ ) &&  this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_senhi_group1+= 2*( this.lineArr[i].match( /基礎化学(C)/ ) &&  this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_senhi_group1+= 2*( this.lineArr[i].match( /基礎生物学(A)/ ) &&  this.lineArr[i].match( /合/ ) || []).length;

                this.cnt_spe_senhi_group2+= 2*( this.lineArr[i].match( /実践英語コミュニケーション/ ) &&  this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_senhi_group2+= 2*( this.lineArr[i].match( /工業英語/ ) &&  this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_kyou_sen+=( this.lineArr[i].match( /共通専門科目/ ) &&  this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_kyou_sen+=( this.lineArr[i].match( /社会中核人材育成学/ ) &&  this.lineArr[i].match( /合/ ) || []).length;

                this.cnt_spe_senhi_group3+= 2*( this.lineArr[i].match( /データサイエンスⅠ/ ) && this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_senhi_group3+= 2*( this.lineArr[i].match( /データサイエンスⅡ/ ) && this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_senhi_group3+= 2*( this.lineArr[i].match( /コース基礎科目/ ) && this.lineArr[i].match(/選択必修/) && this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_senhi=this.cnt_spe_senhi_group1+this.cnt_spe_senhi_group2+this.cnt_spe_senhi_group3;

                this.cnt_spe_courseki_sen+= 2*( this.lineArr[i].match( /コース基礎科目/ ) && this.lineArr[i].match(/選択/) && this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_courseki_sen-= 2*( this.lineArr[i].match( /コース基礎科目/ ) && this.lineArr[i].match(/選択必修/) && this.lineArr[i].match( /合/ ) || []).length;

                this.cnt_spe_coursesen_hi+= 2*( this.lineArr[i].match( /コース専門科目/ ) && this.lineArr[i].match(/必修/) && this.lineArr[i].match( /合/ ) || []).length;
                this.cnt_spe_coursesen_hi-= ( this.lineArr[i].match( /工学倫理/ ) && this.lineArr[i].match( /合/ ) || []).length;

                this.cnt_spe_coursesen_sen+= 2*( this.lineArr[i].match( /コース専門科目/ ) && this.lineArr[i].match(/選択/) && this.lineArr[i].match( /合/ ) || []).length;
                
                this.cnt_spe=this.cnt_spe_kyo_co_hi+this.cnt_spe_senhi+this.cnt_spe_courseki_sen+this.cnt_spe_coursesen_hi+this.cnt_spe_coursesen_sen+this.cnt_spe_kyou_sen;
                //
                
                this.cnt_fre += 2*(( this.lineArr[i].match( /自由選択科目/ ) && this.lineArr[i].match( /合/ ) || []).length);
                }
                
                resolve(reader.result as string);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsText(file, 'shift-jis'); // デフォルトのEncodeはUTF-8
        });
    }
}
