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
        var number: Double = 0.0
        var forward: Bool = false
        var stop: Bool = false
        var backward: Bool = false
        var isConnected: Bool = false
    
    var body: some View {
        VStack{
            Spacer()
//            VStack {
//                Slider(value:$car.state.number)
//                Text("Number: \(car.state.number)")
//            }.padding()
//            .disabled(!car.state.isConnected)
            
            Text("P.I.P 2.0")
                .padding()
                .frame(width:1000,height: 70)
                .background(Color.gray)
            Spacer()
            
            HStack {
    //          level 1
                Button(action: {
                    car.state.number = 1
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
                    car.state.number = 2
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
                    car.state.number = 3
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
                    car.state.forward=true
                    car.state.backward=false
                    car.state.stop=false
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
                    car.state.stop=true
                    car.state.backward=false
                    car.state.forward=false
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
                    car.state.backward=true
                    car.state.forward=false
                    car.state.stop=false
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
            }
            
        }
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        CarView()
    }
}
