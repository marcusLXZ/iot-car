//
//  CarView.swift
//  Car
//
//  Created by Marcus Lin on 4/27/22.
//

import SwiftUI


struct CarView: View {
    @State var myValue: Double = 0.0
    @ObservedObject var car = Car()

    var body: some View {
        VStack{
            Spacer()

            Text("MM CAR")
                .padding()
                .frame(width:1000,height: 70)
                .background(Color.gray)
            Text("Car Speed: \(car.speed)")
                .padding()
            Spacer()
            
            HStack {
    //          level 1
                Button(action: {
                    car.speed = 1.0
                }) {
                    HStack {
                        Spacer()
                        Image(systemName: "1.circle") // Image will be centered and fill the available space
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                        Spacer()
                    }.padding()
                }
                .frame(height: 90)
    //          .background(Color.blue)
                .foregroundColor(.blue)
                
    //          level 2
                Button(action: {
                    car.speed = 2.0
                }) {
                    HStack {
                        Spacer()
                        Image(systemName: "2.circle")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                        Spacer()
                    }.padding()
                }
                .frame(height: 90)
                .foregroundColor(.blue)
                
    //          level 3
                Button(action: {
                    car.speed = 3.0
                }) {
                    HStack {
                        Spacer()
                        Image(systemName: "3.circle")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                        Spacer()
                    }.padding()
                }
                .frame(height: 90)
                .foregroundColor(.blue)
            }
            
            VStack {
    //          forward
                Button(action: {
                    // Do an action or call a function
                }) {
                    HStack {
                        Spacer()
                        Image(systemName: "arrowtriangle.up.fill")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                        Spacer()
                    }.padding()
                }
                .frame(height: 100)
    //            .background(Color.blue)
                .foregroundColor(.blue)
                
    //          stop
                Button(action: {
                    // Do an action or call a function
                }) {
                    HStack {
                        Spacer()
                        Image(systemName: "pause.fill")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                        Spacer()
                    }.padding()
                }
                .frame(height: 100)
                .foregroundColor(.blue)
                
    //          backward
                Button(action: {
                    // Do an action or call a function
                }) {
                    HStack {
                        Spacer()
                        Image(systemName: "arrowtriangle.down.fill")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                        Spacer()
                    }.padding()
                }
                .frame(height: 100)
                .foregroundColor(.blue)
                
//                Slider(value: $myValue)
//                    .padding()
//                Text("My Value: \(myValue)")
//                    .padding()
            }
            
        }
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        CarView()
    }
}
