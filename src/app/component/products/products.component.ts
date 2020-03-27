import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Product} from '../../product.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
productCol: AngularFirestoreCollection<Product>;
products: any;

  constructor(private  afs: AngularFirestore) { }

  ngOnInit(): void {
    this.productCol = this.afs.collection('products');
    this.products = this.productCol.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const  id = a.payload.doc.id;
          return {data, id};
        });
      } )
    );
  }

}
