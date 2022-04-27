//
//  Car.swift
//  Car
//
//  Created by Marcus Lin on 4/27/22.
//

import Foundation

class Car: ObservableObject {
    @Published var forward: Bool = false
    @Published var stop: Bool = false
    @Published var backward: Bool = false
    @Published var speed: Double = 1.0

}
